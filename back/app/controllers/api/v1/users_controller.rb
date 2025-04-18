class Api::V1::UsersController < ApplicationController
  # GET /api/v1/users
  def index
    # 確認用
    @users = User.all
    render json: @users, status: :ok
  end

  # GET /api/v1/users/:id
  def show
    begin
      user = User.find(params[:id])
      
      return render json: { data: user.as_json(
          except: [:provider, :provider_id]
        ).merge(
          created_souls_count: user.creator_souls.count,
          carrying_souls_count: user.owner_souls.count,
          room_id: user.room.id,
        )}, status: :ok

    rescue ActiveRecord::RecordNotFound => e
      # ユーザーが見つからない場合は404を返す
      return render json: { error: e.message }, status: :not_found
    rescue StandardError => e
      # 予期しないエラー
      return render json: { error: e.message }, status: :internal_server_error
    end
  end

  # GET /api/v1/users/find_by_provider
  def find_by_provider
    begin
      # providerとprovider_idを指定してユーザーを取得
      provider = params[:provider]
      provider_id = params[:provider_id]

      if provider.blank? || provider_id.blank?
        return render json: { error: 'provider と provider_id は必須です' }, status: :bad_request
      end

      user = User.find_by(provider: provider, provider_id: provider_id)

      if user.nil?
        return render json: { data: nil, message: 'ユーザーが見つかりません' }, status: :ok
      else
        # user.idのみ返す
        user = user.slice(:id)
        render json: { data: user }, status: :ok
      end
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  # POST /api/v1/users
  def create
    begin
      # トランザクションでUser, Room, Pathway, Treeを同時に作成
      # POINT: トランザクション内で例外をrescueしてしまうとロールバックが行われないので，rescueは外側で行う
      result = ActiveRecord::Base.transaction do
        user = User.create!(user_params) # その他のカラムのデフォルト値はDBまたはモデルで設定
        room = user.create_room!
        room.create_pathway_random!
        user.create_tree!(room_id: room.id, image: 'tree1.png')
        user  # 成功時にuserを返す
      end
      
      # 成功時のレスポンス
      render json: { data: result }, status: :created
    
    # ActiveRecordのバリデーションエラー(422 Unprocessable Entity)
    rescue ActiveRecord::RecordInvalid => e
      render json: { error: e.record.errors }, status: :unprocessable_entity
      
    # create_pathway_random!で他のroomを取得できなかった場合，およびその他のエラー(500 Internal Server Error)
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  # DELETE /api/v1/users/:id
  def destroy
  end

  # PATCH /api/v1/users/:id/move
  # ユーザーが部屋を移動できる場合，last_visit_roomを更新する
  def move
    begin
      target_room = Room.find(params[:room_id])
      user = User.find(params[:id])

      # 既にuserのlast_visit_roomがtarget_room.idと一致している場合は何もしない
      if user.last_visit_room == target_room.id
        return render json: { data: { room_id: target_room.id }, message: "移動済みです" }, status: :ok
      end

      # 移動したいroomがpathwayで接続しているroomのリストを取得
      linked_rooms = target_room.linked_rooms

      if linked_rooms.any?{ |r| r.id == user.last_visit_room }
        # userのlast_visit_roomがリストに含まれる場合, 移動可能としてuserのlast_visit_roomを更新
        user.update!(last_visit_room: target_room.id)
        return render json: { data: { room_id: target_room.id }, message: "部屋を移動しました" }, status: :ok
      else
        # 移動できない場合は403 Forbiddenを返す
        return render json: { error: "移動権限がありません" }, status: :forbidden
      end

    # target_roomまたはuserが見つからない場合は404を返す
    rescue ActiveRecord::RecordNotFound => e
      return render json: { error: e.message }, status: :not_found
    
    # 予期しないエラー
    rescue StandardError => e
      return render json: { error: e.message }, status: :internal_server_error
    end
  end

  # GET api/v1/users/:id/profile
  def profile
    begin
      user = User.find(params[:id])
      user_tree = user.tree
      user_souls = user.creator_souls

      if user_tree.nil?
        return render json: { error: "キが存在しません" }, status: :not_found
      end
      
      return render json: { 
        data: {
          user: user.as_json(except: [:provider, :provider_id]),
          tree: user_tree.as_json.merge(exp_progress_percent: user_tree.exp_progress_percent),
          souls: user_souls
        }
      }, status: :ok
      

    rescue ActiveRecord::RecordNotFound => e
      # ユーザーが見つからない場合は404を返す
      return render json: { error: e.message }, status: :not_found
    rescue StandardError => e
      # 予期しないエラー
      return render json: { error: e.message }, status: :internal_server_error
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :provider, :provider_id)
  end
end
