class Api::V1::UsersController < ApplicationController
  # GET /api/v1/users
  def index
    # 確認用
    @users = User.all
    render json: @users, status: :ok
  end

  # GET /api/v1/users/:id
  def show
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
        return render json: { error: 'ユーザーが見つかりません' }, status: :not_found
      else
        # user.idのみ返す
        user = user.slice(:id)
        render json: {data: user}, status: :ok
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
      render json: result, status: :created
    
    # ActiveRecordのバリデーションエラー
    rescue ActiveRecord::RecordInvalid => e
      render json: e.record.errors, status: :unprocessable_entity
      
    # create_pathway_random!で他のroomを取得できなかった場合，およびその他のエラー
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  # DELETE /api/v1/users/:id
  def destroy
  end

  private
  def user_params
    params.require(:user).permit(:name, :provider, :provider_id)
  end
end
