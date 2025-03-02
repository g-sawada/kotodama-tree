class AddUniqueIndexToPathways < ActiveRecord::Migration[7.2]
  def change
    add_index :pathways, [:room_1_id, :room_2_id], unique: true
  end
end
