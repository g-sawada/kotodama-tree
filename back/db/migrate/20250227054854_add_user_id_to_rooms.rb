class AddUserIdToRooms < ActiveRecord::Migration[7.2]
  def change
    add_reference :rooms, :user, type: :uuid, foreign_key: { on_delete: :nullify }, index: { unique: true }
  end
end
