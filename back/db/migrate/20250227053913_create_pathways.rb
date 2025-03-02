class CreatePathways < ActiveRecord::Migration[7.2]
  def change
    create_table :pathways do |t|
      t.integer :figuretype #モーダルのボタン
      t.string :color #モーダルボタンの色
      t.timestamps
    end
  end
end
