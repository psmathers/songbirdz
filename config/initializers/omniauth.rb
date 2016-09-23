Rails.application.config.middleware.use OmniAuth::Builder do
  provider :spotify, Rails.application.secrets.client_id, Rails.application.secrets.client_secret, scope: 'playlist-read-private user-read-private user-read-email playlist-modify-public playlist-modify-private user-library-read user-top-read user-read-birthdate'
end


