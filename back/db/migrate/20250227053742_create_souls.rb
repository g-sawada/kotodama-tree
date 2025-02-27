class CreateSouls < ActiveRecord::Migration[7.2]
  def change
    create_table :souls do |t|
      t.string :content, null: false
      t.integer :captured_count, default: 0, null: false
      t.integer :harvested_count, default: 0, null: false
      t.timestamps
    end
  end
end
