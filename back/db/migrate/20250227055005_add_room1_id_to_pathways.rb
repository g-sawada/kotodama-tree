class AddRoom1IdToPathways < ActiveRecord::Migration[7.2]
  def change
    add_reference :pathways, :room_1, type: :uuid, null: false, foreign_key: { to_table: :rooms }
  end
end
