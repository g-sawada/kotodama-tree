class Api::V1::RoomsController < ApplicationController
  # GET /api/v1/rooms/:id
  def show
    begin
      id = params[:id]
      room = Room.find_by(id: id)
      # roomが存在する場合，pathwaysとtree(idのみ)のデータも返す
      if room  
        pathways = room.room_1_pathways + room.room_2_pathways
        render json: { 
          data: { 
            room: room,
            pathways: pathways,
            tree: { id: room.tree.id }
            # NOTE: 0321 現時点では最小限のデータとしてidのみを返すようにしておく
            }
          },
          status: :ok
      
      # roomが存在しない場合は404(Not Found)を返す
      else
        render json: { error: "対象のroomが見つかりません room.id: #{id}" }, status: :not_found
      end
    
    # その他の予期しないエラー
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end
end