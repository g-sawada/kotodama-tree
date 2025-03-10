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

  # POST /api/v1/users
  def create
    # トランザクションでUser, Room, Treeを同時に作成
    result = ActiveRecord::Base.transaction do
      user = User.create!(user_params) # その他のカラムのデフォルト値はDBまたはモデルで設定
      room = user.create_room!
      user.create_tree!(room_id: room.id, image: 'tree1.png')
      
      user  # 成功時にuserを返す
    end

    if result
      render json: result, status: :created
    else
      render json: result.errors, status: :unprocessable_entity
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
