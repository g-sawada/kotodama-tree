class CreateTrees < ActiveRecord::Migration[7.2]
  def change
    create_table :trees do |t|
      t.integer :level, default: 1, null: false
      t.integer :exp, default: 0, null: false
      t.datetime :last_charged_at
      t.string :image, null: false
      t.timestamps
    end
  end
end
