class User < ApplicationRecord
  has_many :user_preferences
  has_many :preferences, through: :user_preferences
  has_many :sent_pairs, class_name: "Pair", foreign_key: :sender_id
  has_many :received_pairs, class_name: "Pair", foreign_key: :receiver_id

  def self.create_with_omniauth(auth)
    create! do |user|
      user.provider = auth["provider"]
      user.uid = auth["uid"]
      user.name = auth["info"]["name"]
      user.name = auth["info"]["name"]
      user.token = auth["credentials"]["token"]
    end
  end

  def get_birdlist
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

    playlist_obj
  end

  def get_tracks
    id = self.get_birdlist["id"]
    url = "https://api.spotify.com/v1/users/#{self.uid}/playlists/#{id}?access_token=#{self.token}&fields=tracks.items(track(name))"
    response = Net::HTTP.get_response(URI.parse(url))
    playlist_hash = JSON.parse(response.body)
    tracks_arr = playlist_hash["tracks"]["items"]
    tracks_arr.map! do |track_obj|
      track_obj["track"]["name"]
    end
    tracks_arr
  end

  def preference_match
    matches= []
    potential_matches = (User.where.not(id: self.id)).where(age: self.min_age_choice..self.max_age_choice)
    self.preferences.each do |pref|
      if pref.looking_for == "women"
        matches = (potential_matches.where(gender: "female"))
        matches = (matches.where)
      elsif pref.looking_for == "men"
        matches = (potential_matches.where(gender: "male"))
      end
    end
    matches
  end

  def match_list
    matches= []

    pref_matches= self.preference_match

    my_tracks = self.get_tracks

    my_tracks.each_with_index do |mytrack,myindex|
      pref_matches.map do |match|
        if match.preference_match.include?(self)

          match.get_tracks.each_with_index do |track,theirindex|
            if theirindex == 0 && myindex == 0
              if mytrack == track
                matches << {"object" => match, "tier" => "1", "playlist" => "this is a string we need for the iframe playlist maybe"}
              end
            else
              if mytrack == track
                matches << {"object" => match, "tier" => "2", "playlist" => "this is a string we need for the iframe playlist maybe"}
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
end
