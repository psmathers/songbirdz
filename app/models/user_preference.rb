class UserPreference < ApplicationRecord
  belongs_to :user
  belongs_to :preference

  # vaildates :user, :preference, presence: true
  validates :user, uniqueness: {scope: :preference}
end
