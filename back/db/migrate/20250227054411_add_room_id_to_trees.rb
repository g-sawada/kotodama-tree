class AddRoomIdToTrees < ActiveRecord::Migration[7.2]
  def change
    add_reference :trees, :room, type: :uuid, null: false, foreign_key: true, index: { unique: true }
  end
end
