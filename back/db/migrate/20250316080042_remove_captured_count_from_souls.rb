class RemoveCapturedCountFromSouls < ActiveRecord::Migration[7.2]
  def change
    remove_column :souls, :captured_count
  end
end
