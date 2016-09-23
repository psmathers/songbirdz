Rails.application.config.middleware.use OmniAuth::Builder do
  provider :spotify, '6ae2b4f168314399b3ddfda0e2016e43', 'daf76747ff524b14b3a45eda14e39e0b', scope: 'playlist-read-private user-read-private user-read-email playlist-modify-public playlist-modify-private user-library-read user-top-read user-read-birthdate'
end
