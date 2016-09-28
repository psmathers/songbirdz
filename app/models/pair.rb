class Pair < ApplicationRecord
  belongs_to :sender, class_name: "User"
  belongs_to :receiver, class_name: "User"
  has_many :chats, dependent: :destroy

  validates :sender, uniqueness: {scope: :receiver_id}
  validate :one_chat

  private

  def one_chat
    if self.chats
      self.chats.length <= 1
    end
  end
end
