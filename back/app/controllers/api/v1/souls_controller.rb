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
end