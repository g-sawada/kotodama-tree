class AddSystemUserToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :system_user, :integer, default: 0, null: false
  end
end
