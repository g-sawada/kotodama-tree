class Api::V1::SoulsController < ApplicationController
  # GET /api/v1/souls
  def index
    # クエリパラメータで creator_id, owner_id, captured_tree_id を受ける
    creator_id = params[:creator_id]
    owner_id = params[:owner_id]
    captured_tree_id = params[:captured_tree_id]

    # nilまたはblankではないパラメータのみで検索条件を構成
      # NOTE: compact_blankはnilまたはblankの値を取り除いたHashを返す
    conditions = {
      creator_id: creator_id,
      owner_id: owner_id,
      captured_tree_id: captured_tree_id
    }.compact_blank

    # パラメータが全てnilの場合はエラー (400 Bad Request)
    if conditions.empty?
      return render json: { error: 'パラメータは最低1つ必要です' }, status: :bad_request
    end

    begin
      # creator(User)とfavoritesをincludesして検索結果を取得
      souls = Soul.includes(:creator, :favorites).where(conditions)

      render json: { 
        data: souls.as_json(
          include: { 
            # creatorはprovider, provider_idを除外してreturn
            creator: { except: [:provider, :provider_id] },
            # favoritesはオプションなしのため空のHashを指定
            favorites: {}  
          }
        )}, status: :ok
        # NOTE: 検索結果が0件の場合は空の配列が返る

    # 予期しないエラー
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

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

  def harvest
    begin
      @soul = Soul.find(params[:id])
      user = User.find(params[:user_id])
      room = Room.find(params[:room_id])
      tree = room.tree
      # last_visit_roomが現在訪れている部屋でない場合は403を返す
      if user.last_visit_room != room.id
        return render json: { error: "アクセス権がありません" }, status: :forbidden
      end
      # 現在訪れている部屋のキに対象のコトダマが捧げられていない場合は409(Conflict)を返す
      if tree.captured_tree_souls.exclude?(@soul)
        return render json: { error: "データが一致しません" }, status: :conflict
      end
      # ユーザーの手持ちコトダマ数が上限値に達している場合は409(Conflict)を返す
      if user.max_carry_souls <= user.owner_souls.count
        return render json: { error: "手持ちコトダマ数が上限に達しています" }, status: :conflict
      end

      result = ActiveRecord::Base.transaction do
        @soul.owner_id = user.id
        @soul.captured_tree_id = nil
        @soul.harvested_count += 1
        @soul.save!
        @soul  # 成功時にsoulを返す
      end

      # 成功時のレスポンス
      render json: { data: result }, status: :ok
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
