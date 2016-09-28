class AddChatIdToPair < ActiveRecord::Migration[5.0]
  def change
    add_column :pairs, :chat_id, :integer
  end
end
