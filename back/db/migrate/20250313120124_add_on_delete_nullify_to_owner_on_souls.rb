class AddOnDeleteNullifyToOwnerOnSouls < ActiveRecord::Migration[7.2]
  def change
    remove_foreign_key :souls, column: :owner_id

    add_foreign_key :souls, :users, column: :owner_id, on_delete: :nullify
  end
end
