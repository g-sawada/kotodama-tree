class AddRoom2IdToPathways < ActiveRecord::Migration[7.2]
  def change
    add_reference :pathways, :room_2, type: :uuid, null: false, foreign_key: { to_table: :rooms }
  end
end
