class Api::V1::TreesController < ApplicationController
  #PATCH /api/v1/trees/:id/charge
  #@param user_id: 実行ユーザーのID
  def charge
    begin
      tree = Tree.find(params[:id])
      # treeが見つからない場合は404を返す
      return render json: { error: 'Tree not found' }, status: :not_found  if tree.nil?

      user = User.find(params[:user_id])
      # ユーザーが見つからない場合は404を返す
      return render json: { error: 'User not found' }, status: :not_found  if user.nil?

      # ユーザーがtreeの所有者でない場合は403を返す
      if tree.user_id != user.id
        return render json: { error: 'ユーザーのキではありません' }, status: :forbidden
      end

      # ユーザーのlast_visit_roomがtreeの部屋IDと一致しない場合は403を返す
      if user.last_visit_room != tree.room_id
        return render json: { error: 'アクセス権がありません' }, status: :forbidden
      end

      # 現在時刻がtreeのlast_charged_atから1時間以内の場合，403を返す
      # last_charged_atがnilの場合は初回チャージとしてチェック処理をスキップ
      if tree.last_charged_at.present? &&
          tree.last_charged_at > Time.current - Tree::CHARGE_INTERVAL
        return render json: { 
          error: "前回のチャージ実行から指定の時間が経過していません。last_charged_at: #{tree.last_charged_at}" 
          }, status: :forbidden
      end
      
      # treeに捧げられている全soulsの経験値を合計
      total_exp = tree.captured_tree_souls.sum{ |soul| soul.exp() }
      # 経験値加算前のレベルを取得
      level_before = tree.current_level

      # トランザクション処理でtreeの経験値を加算 & last_charged_atを更新
      result = ActiveRecord::Base.transaction do
        # treeの経験値加算処理。レベルアップが生じる場合はレベルも更新
        tree.add_exp(total_exp)
        tree.last_charged_at = Time.current
        tree.save!
        tree  # 成功時にtreeを返す
      end

      # 経験値加算後のレベルを取得
      level_after = result.current_level

      # 更新後のtreeデータと，レベル更新の有無を返す
      return render json: {data: {
        tree: result,
        level_updated: level_before != level_after,
        }}, status: :ok

      # その他の予期しないエラー
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end
end