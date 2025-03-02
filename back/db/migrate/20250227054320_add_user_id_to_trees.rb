class AddUserIdToTrees < ActiveRecord::Migration[7.2]
  def change
    add_reference :trees, :user, type: :uuid, null: false, foreign_key: true, index: { unique: true }
  end
end
