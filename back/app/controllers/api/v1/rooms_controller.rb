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
            tree: room.tree,
            roomOwnerName: room.user.name
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
      user = User.find_by(id: params[:user_id])
      if user.nil?
        return render json: { error: 'user not found' }, status: :not_found
      end

      target_room = Room.find_by(id: params[:id])
      if target_room.nil?
        return render json: { error: 'room not found' }, status: :not_found
      end

      # userのlast_visit_roomがnilの場合，ユーザーのroom.idで更新する
      if user.last_visit_room.nil?
        user.update!(last_visit_room: user.room.id)
      end

      # userのlast_visit_roomがtarget_room.idと一致するかをチェック
      can_enter = user.last_visit_room == target_room.id

      # canEnterのtrue/falseをステータス200で返す
      render json: { data: { canEnter: can_enter }}, status: :ok

    # 予期しないエラー
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end
end