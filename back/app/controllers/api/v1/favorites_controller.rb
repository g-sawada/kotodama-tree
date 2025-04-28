class Api::V1::FavoritesController < ApplicationController
  def create
    begin
      soul = Soul.find_by(id: params[:soul_id])
      if soul.nil?
        return render json: { error: "コトダマが存在しません" }, status: :not_found
      end
      user = User.find(params[:user_id])
      if user.favorite?(soul)
        return render json: { error: "すでにお気に入り済みです" }, status: :conflict
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
      if !user.favorite?(soul)
        return render json: { error: "データが一致しません" }, status: :conflict
      end
      user.unfavorite(soul)
      render json: { data: soul }, status: :ok
    # その他の予期しないエラー
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end
end