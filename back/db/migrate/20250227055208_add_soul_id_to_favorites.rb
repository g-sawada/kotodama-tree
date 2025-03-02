class AddSoulIdToFavorites < ActiveRecord::Migration[7.2]
  def change
    add_reference :favorites, :soul, null: false, foreign_key: true
  end
end
