class Api::V1::FavoritesController < ApplicationController
  def create
    begin
      soul = Soul.find(params[:soul_id])
      user = User.find(params[:user_id])
      user.favorite(soul)
      favorite = user.favorites.find_by(soul_id: soul.id)
      render json: { data: favorite }, status: :created
    # その他の予期しないエラー
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  def destroy
    begin
      user = User.find(params[:user_id])
      soul = user.favorites.find(params[:favorite_id]).soul
      user.unfavorite(soul)
    # その他の予期しないエラー
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end
end