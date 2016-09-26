class Pair < ApplicationRecord
  belongs_to :sender, class_name: "User"
  has_one :receiver, class_name: "User"

  # validates :receiver, presence: true
  validates :sender, uniqueness: {scope: :receiver_id}

end
