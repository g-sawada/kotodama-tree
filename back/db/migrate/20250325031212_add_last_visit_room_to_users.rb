class AddLastVisitRoomToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :last_visit_room, :uuid
  end
end
