class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users, id: :uuid do |t|
      t.string :name, null: false
      t.integer :level, default: 1, null: false
      t.integer :exp, default: 0, null: false
      t.integer :max_create_souls, null: false
      t.integer :max_carry_souls, null: false
      t.string :provider, null: false
      t.string :provider_id, null: false
      t.timestamps
    end
    add_index :users, [:provider, :provider_id], unique: true
  end
end
