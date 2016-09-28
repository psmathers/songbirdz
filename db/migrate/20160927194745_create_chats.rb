class CreateChats < ActiveRecord::Migration[5.0]
  def change
    create_table(:chats, id: false) do |t|
      t.integer :id, null: false
      t.integer :pair_id, null: false
      t.timestamps null: false
    end
  end
end
