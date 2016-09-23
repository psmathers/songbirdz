class CreatePreferences < ActiveRecord::Migration[5.0]
  def change
    create_table :preferences do |t|
      t.string :looking_for, null: false

      t.timestamps
    end
  end
end
