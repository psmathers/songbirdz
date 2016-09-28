class Chat < ApplicationRecord
  belongs_to :pair
  has_many :messages, dependent: :destroy
end
