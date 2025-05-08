class CreateCaptureLogs < ActiveRecord::Migration[7.2]
  def change
    create_table :capture_logs do |t|
      t.string :capture_user, null: false
      t.integer :soul_id, null: false
      t.string :creator_id, null: false

      t.timestamps
    end
  end
end
