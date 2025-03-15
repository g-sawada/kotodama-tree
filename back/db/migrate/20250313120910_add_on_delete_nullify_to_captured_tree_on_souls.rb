class AddOnDeleteNullifyToCapturedTreeOnSouls < ActiveRecord::Migration[7.2]
  def change
    remove_foreign_key :souls, column: :captured_tree_id

    # on_delete: :nullify を追加した外部キーを再設定
    add_foreign_key :souls, :trees, column: :captured_tree_id, on_delete: :nullify
  end
end
