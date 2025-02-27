class AddCreatorUserIdToSouls < ActiveRecord::Migration[7.2]
  def change
    add_reference :souls, :creator, type: :uuid, null: false, foreign_key: { to_table: :users }
  end
end
