class CreatePairs < ActiveRecord::Migration[5.0]
  def change
    create_table :pairs do |t|
      t.integer :sender_id, null: false
      t.integer :receiver_id
      t.boolean :accepted

      t.timestamps
    end
  end
end
