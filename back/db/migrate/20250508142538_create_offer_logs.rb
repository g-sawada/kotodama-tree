class CreateOfferLogs < ActiveRecord::Migration[7.2]
  def change
    create_table :offer_logs do |t|
      t.string :offer_user, null: false
      t.integer :soul_id, null: false
      t.string :creator_id, null: false

      t.timestamps
    end
  end
end
