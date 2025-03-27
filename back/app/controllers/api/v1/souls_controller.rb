class Api::V1::SoulsController < ApplicationController
  # POST /api/v1/souls
  def create
    begin
      user = User.find(params[:soul][:creator_id])
      # last_visit_roomがユーザー自身の部屋でない場合は403を返す
      if user.last_visit_room != user.room.id
        return render json: { error: "アクセス権がありません" }, status: :forbidden
      end
      # ユーザーが作成済みのコトダマ数が上限値に達している場合は409(Conflict)を返す
      created_souls_count = user.creator_souls.count
      if user.max_create_souls <= created_souls_count
        return render json: { error: "コトダマ作成数が上限に達しています" }, status: :conflict
      end
      @soul = Soul.new(content: params[:soul][:content], creator_id: user.id, home_tree_id: user.tree.id, captured_tree_id:  user.tree.id)
      if @soul.save
        render json: { data: @soul }, status: :created
      # saveに失敗した場合は422(Unprocessable Entity)を返す
      else
        return render json: { error: "コトダマを作成できませんでした" }, status: :unprocessable_entity
      end

    # その他の予期しないエラー
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  private
  def soul_params
    params.require(:soul).permit(:content, :creator_id)
  end
end
