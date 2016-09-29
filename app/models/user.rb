class User < ApplicationRecord
  attr_accessor :match_tier

  has_many :user_preferences
  has_many :preferences, through: :user_preferences
  has_many :sent_pairs, class_name: "Pair", foreign_key: :sender_id
  has_many :received_pairs, class_name: "Pair", foreign_key: :receiver_id
  has_attached_file :image, styles: { small: "64x64", med: "100x100", large: "200x200" }

  # before_create :get_avatar
  before_update :get_birdlist_id, :get_anthem_id

  validates_attachment :image
      content_type: { content_type: ["image/jpeg", "image/gif", "image/png", "image/jpg"] }

# <img src="<%= current_user.image.url %>"/>

  def self.create_with_omniauth(auth)
    create! do |user|
      user.provider = auth["provider"]
      user.uid = auth["uid"]
      user.name = auth["info"]["name"]
      user.token = auth["credentials"]["token"]
      user.refresh_token = auth["credentials"]["refresh_token"]
    end
  end

  def display_img
    if self.image.url.include?("missing.png")
      "http://www.njpp.org/wp-content/themes/njpp15/images/default_image.png"
    else
      self.image.url(:large)
    end
  end

  # def s3_credentials
  #   {:bucket => ENV.fetch('S3_BUCKET_NAME'), :access_key_id => ENV.fetch('AWS_ACCESS_KEY_ID'), :secret_access_key => 'AWS_SECRET_ACCESS_KEY', :s3_region => ENV.fetch('AWS_REGION')}
  # end

  # def get_avatar
  #   url = "https://randomuser.me/api/"
  #   response = Net::HTTP.get_response(URI.parse(url))

  #   hash = JSON.parse(response.body)
  #   img_link = hash["results"][0]["picture"]["large"]
  #   self.avatar = img_link
  # end

  def get_new_token
    uri = URI.parse("https://accounts.spotify.com/api/token")
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    req = Net::HTTP::Post.new(uri)
    req.content_type = "application/x-www-form-urlencoded"
    data = URI.encode_www_form({'client_id'=> "#{Rails.application.secrets.client_id}", 'client_secret' =>"#{Rails.application.secrets.client_secret}", 'refresh_token'=>"#{self.refresh_token}", 'grant_type' =>'refresh_token'})
    req.body = data
    response = http.request(req)
    json = JSON.parse(response.body)
    self.token = json["access_token"]
    self.save
  end

  def get_birdlist_id
    url = "https://api.spotify.com/v1/users/#{self.uid}/playlists/?access_token=#{self.token}"
    response = Net::HTTP.get_response(URI.parse(url))

    playlist_hash = JSON.parse(response.body)
    playlist_arr = playlist_hash["items"]


    playlist_obj = nil
    playlist_arr.each do |playlist|
      if playlist["name"] == "Birdlist"
        playlist_obj = playlist
        break
      end
    end

    self.birdlist_id = playlist_obj["id"]
    # self.save
  end

  def get_tracks
    id = self.birdlist_id
    url = "https://api.spotify.com/v1/users/#{self.uid}/playlists/#{id}?access_token=#{self.token}&fields=tracks.items(track(name,id))"
    response = Net::HTTP.get_response(URI.parse(url))
    playlist_hash = JSON.parse(response.body)
    tracks_arr = playlist_hash["tracks"]["items"]
    tracks_hash = {}
    tracks_arr.map! do |track_obj|
      # binding.pry
      # track_obj["track"]["name"]
      tracks_hash.store(track_obj["track"]["id"], track_obj["track"]["name"])

    end
    # tracks_arr
    # binding.pry
    tracks_hash
  end

  def get_anthem_id
    self.anthem_id = self.get_tracks.first[0]
    # self.save
  end


  def preference_match
    matches= []
    potential_matches = User.where(age: self.min_age_choice..self.max_age_choice) - [self]

    self.preferences.each do |pref|
      if pref.looking_for == "women"
        matches = potential_matches.select { |match| match.gender == "female" }
      elsif pref.looking_for == "men"
        matches = potential_matches.select { |match| match.gender == "male" }
      end
    end
    matches
  end

  def filter_pairs
    rejected_sent_pairs = self.sent_pairs
    rejected_received_pairs = self.received_pairs.where.not(accepted: nil)

    not_rejected_users = self.preference_match

    not_rejected_users.each do |person|

      rejected_sent_pairs.each do |pair|
        if pair.receiver == person
          not_rejected_users -= [person]
        end
      end

      rejected_received_pairs.each do |pair|
        if pair.sender == person
          not_rejected_users -= [person]
        end
      end
    end

    not_rejected_users
  end


  def match_list
    matches= []

    pref_matches= self.filter_pairs

    my_tracks = self.get_tracks #now a hash with id as key and song title as value

    my_tracks.each_with_index do |(mytrack_id, mytrack), myindex|
      # binding.pry
      pref_matches.map do |match|
        # binding.pry
        if match.preference_match.include?(self)

          match.get_tracks.each_with_index do |(track_id, track),theirindex|
            # binding.pry
            if theirindex == 0 && myindex == 0
              if mytrack == track
                match.match_tier = 1
                matches << match
                # matches << {"object" => match, "tier" => "1", "playlist" => "this is a string we need for the iframe playlist maybe"}
              end
            else

              if mytrack == track && !matches.include?(match)
                # binding.pry
                match.match_tier = 2
                matches << match
                # matches << {"object" => match, "tier" => "2", "playlist" => "this is a string we need for the iframe playlist maybe"}
              end
            end
          end
        end
      end
    end
    matches
  end


  def update_preferences(params)
    if params[:men]
      self.user_preferences.create(preference_id: 1)
    else
      pref = UserPreference.find_by(user_id: self.id, preference_id: 1)
      if pref
        pref.destroy
      end
    end

    if params[:women]
      self.user_preferences.create(preference_id: 2)
    else
      pref = UserPreference.find_by(user_id: self.id, preference_id: 2)
      if pref
        pref.destroy
      end
    end

    if params[:other]
      self.user_preferences.create(preference_id: 3)
    else
      pref = UserPreference.find_by(user_id: self.id, preference_id: 3)
      if pref
        pref.destroy
      end
    end
  end

  def get_matched_pairs
    sent_pairs = self.sent_pairs.where(accepted: true)
    received_pairs = self.received_pairs.where(accepted:true)

    initial_pairs = []

    sent_pairs.each do |pair|
      initial_pairs << pair
    end

    received_pairs.each do |pair|
      initial_pairs << pair
    end

    all_pairs = []
    initial_pairs.each do |pair|
      pair_hash ={}
      if pair.receiver == self
        pair_hash["id"] = pair.sender.id
        pair_hash["name"] = pair.sender.name
        pair_hash["age"] = pair.sender.age
        pair_hash["gender"] = pair.sender.gender
        pair_hash["about"] = pair.sender.about
        pair_hash["anthem_id"] = pair.sender.anthem_id
        pair_hash["chat_id"] = pair.id
        all_pairs << pair_hash
      else
        pair_hash["id"] = pair.receiver.id
        pair_hash["name"] = pair.receiver.name
        pair_hash["age"] = pair.receiver.age
        pair_hash["gender"] = pair.receiver.gender
        pair_hash["about"] = pair.receiver.about
        pair_hash["anthem_id"] = pair.receiver.anthem_id
        pair_hash["chat_id"] = pair.id
        all_pairs << pair_hash
      end

    end
    all_pairs #this is a hash of users who are paired with the current_user either as sender or receiver
  end

end
