class AddUserIdToFavorites < ActiveRecord::Migration[7.2]
  def change
    add_reference :favorites, :user, type: :uuid, null: false, foreign_key: true
  end
end
