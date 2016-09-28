class Chat < ApplicationRecord
  belongs_to :pair
  has_many :messages
end
