class Api::V1::PathwaysController < ApplicationController
  # POST /api/v1/pathways
  def create
    begin
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
                  figure_type: rand(1..3), # 1から3のランダムな整数
                  color: ["#FFB6C1", "#FFD700", "#98FB98", "#ADD8E6", "#FF69B4", "#FF6347", "#E6E6FA", "#DDA0DD"].sample, # カラーをランダムに選択
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
