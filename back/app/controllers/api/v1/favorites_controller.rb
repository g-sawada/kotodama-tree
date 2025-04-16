class Api::V1::FavoritesController < ApplicationController
  def create
    begin
      soul = Soul.find(params[:soul_id])
      user = User.find(params[:user_id])
      if user.favorites_souls.include?(soul)
        return render json: { error: "すでにいいね済みです" }, status: :conflict
      end
      user.favorite(soul)
      favorite = user.favorites.find_by(soul_id: soul.id)
      render json: { data: favorite }, status: :created
    # その他の予期しないエラー
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  # DELETE /api/v1/souls/:soul_id/favorites
  def destroy
    begin
      user = User.find(params[:user_id])
      soul = Soul.find(params[:soul_id])
      if user.favorites_souls.exclude?(soul)
        return render json: { error: "データが一致しません" }, status: :conflict
      end
      user.unfavorite(soul)
    # その他の予期しないエラー
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end
end