class AddCheckConstraintToSystemUser < ActiveRecord::Migration[7.2]
  def change
    add_check_constraint :users, '"system_user" IN (0, 1)', name: "system_user_check" # nameで削除を簡略化
  end
end
