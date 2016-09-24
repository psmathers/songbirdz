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

  def api_playlists
    uri = URI("https://api.spotify.com/v1/users/#{self.uid}/playlists")
    req = Net::HTTP::Get.new(uri)
    req.add_field("Authorization", "token #{self.token}")

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    response = http.request(req)

    JSON.parse(response.body)

  end

  # def match_list
  #   returned_matches= []
  #   matches= User.all
  #
  #   current_playlist= current_user.api_playlists.songbirdz
  #
  #   matches.each do |match|
  #   end
  #
  # end

end
