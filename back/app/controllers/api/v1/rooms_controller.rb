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

  # POST /api/v1/rooms/:id/enter
  # ユーザーが部屋にアクセス可能かどうかをチェックする
  # URLからroom_idを取得，bodyからuser_idを取得
  def enter
    begin
      target_room = Room.find(params[:id])
      user = User.find(params[:user_id])

      # userのlast_visit_roomがtarget_room.idと一致するかをチェック
      can_enter = user.last_visit_room == target_room.id

      # canEnterのtrue/falseをステータス200で返す
      render json: { data: { canEnter: can_enter }}, status: :ok
    
    # target_roomまたはuserが見つからない場合は404を返す
    rescue ActiveRecord::RecordNotFound => e
      render json: { error: e.message }, status: :not_found

    # 予期しないエラー
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end
end