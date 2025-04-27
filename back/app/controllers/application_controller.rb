class ApplicationController < ActionController::API
  before_action :check_maintenance

  private
  def check_maintenance
    # 最新のリセット実行スケジュールを取得
    latest_schedule = ResetSchedule.order(id: :desc).first

    # 取得結果が空の場合，ログを出力して503エラーを返す
    if latest_schedule.nil?
      Rails.logger.warn "[WARNING] リセットスケジュールが取得できませんでした。"
      return render json: { error: "リセットスケジュールが取得できませんでした。" }, status: :service_unavailable
    end

    # ステータスが not_started（0）かつ scheduled_start_timeが現在時刻よりも後の場合はスルーする
    return if latest_schedule.status == 'not_started' && latest_schedule.scheduled_start_time > Time.current
    # ステータスが success（3）の場合はスルーする
    return if latest_schedule.status == 'success'

    # 以下は全てメンテナンス中のため503エラーを返す
    # ステータスが not_started（0）かつ scheduled_start_timeが現在時刻よりも前の場合
    if latest_schedule.status == 'not_started' && latest_schedule.scheduled_start_time < Time.current
      # ステータスを preparing（1）に更新
      latest_schedule.update!(status: 1)
      Rails.logger.info "[INFO] リセット実行スケジュールのステータスを preparing に更新しました。"
    end 
    
    return render json: { error: "メンテナンス中です。" }, status: :service_unavailable
  end
end
