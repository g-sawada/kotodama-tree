class CreateRooms < ActiveRecord::Migration[7.2]
  def change
    create_table :rooms, id: :uuid do |t|
      t.timestamps
    end
  end
end
