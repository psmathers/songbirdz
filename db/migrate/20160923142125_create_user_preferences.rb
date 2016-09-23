class CreateUserPreferences < ActiveRecord::Migration[5.0]
  def change
    create_table :user_preferences do |t|
      t.integer :user_id
      t.integer :preference_id

      t.timestamps
    end
  end
end
