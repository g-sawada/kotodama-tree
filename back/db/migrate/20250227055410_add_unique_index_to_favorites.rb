class AddUniqueIndexToFavorites < ActiveRecord::Migration[7.2]
  def change
    add_index :favorites, [:user_id, :soul_id], unique: true
  end
end
