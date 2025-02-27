class AddHomeTreeIdToSouls < ActiveRecord::Migration[7.2]
  def change
    add_reference :souls, :home_tree, foreign_key: { to_table: :trees }
  end
end
