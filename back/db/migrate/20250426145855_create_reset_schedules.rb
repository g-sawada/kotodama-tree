class CreateResetSchedules < ActiveRecord::Migration[7.2]
  def change
    create_table :reset_schedules do |t|
      t.integer :status, null: false
      t.string :token
      t.datetime :scheduled_start_time
      t.datetime :started_at
      t.datetime :finished_at

      t.timestamps
    end
  end
end
