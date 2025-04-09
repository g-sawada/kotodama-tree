class Api::V1::PathwaysController < ApplicationController
  # POST /api/v1/pathways
  def create
    begin
      # paramsがString型でない場合はエラー
      if !(params[:room_1_id].is_a?(String)) || !(params[:room_2_id].is_a?(String))
        return render json: { error: 'パラメータの型が一致していません' }, status: :unprocessable_entity
      end
      # 2つのroom_idが存在するか確認
      if Room.find_by(id: params[:room_1_id]).nil? || Room.find_by(id: params[:room_2_id]).nil?
        return render json: { error: 'パラメータが確認できませんでした' }, status: :bad_request
      end
      # 重複排除のため，2つのroom_idをソートしてから保存
      smaller_room_id, larger_room_id = [params[:room_1_id], params[:room_2_id]].sort

      # 2つの部屋が同一IDの場合は422(Unprocessable Entity)を返す
      if smaller_room_id == larger_room_id
        return render json: { error: "同一の部屋のためポータルが作成できませんでした" }, status: :unprocessable_entity
      end

      result = Pathway.find_by(room_1_id: smaller_room_id, room_2_id: larger_room_id)
      if result
        render json: { data: result }, status: :ok
      else
        result = Pathway.create!(
                  room_1_id: smaller_room_id,
                  room_2_id: larger_room_id
                )
        render json: { data: result }, status: :created
      end
    # その他の予期しないエラー
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end
end
