class Api::V1::SystemController < ApplicationController
  skip_before_action :check_maintenance

  # GET /api/v1/maintenance
  def maintenance
    # 最新のリセット実行スケジュールを取得
    latest_schedule = ResetSchedule.order(id: :desc).first

    # 取得結果が空の場合，異常のためログを出力し，レスポンスは200(OK）でメンテナンス中として返す
    if latest_schedule.nil?
      Rails.logger.warn "[WARNING] リセットスケジュールが取得できませんでした。"
      return render json: { data: { isMaintenance: true, nextResetStartAt: nil } }, status: :ok
    end

    # ステータスが not_started（0）かつ scheduled_start_timeが現在時刻よりも後の場合は 非メンテナンス
    if latest_schedule.status == 'not_started' && latest_schedule.scheduled_start_time > Time.current
      return render json: { data: { 
          isMaintenance: false, nextResetStartAt: latest_schedule.scheduled_start_time 
        } }, status: :ok
    end
    # ステータスが success（3）の場合は 非メンテナンス
    if latest_schedule.status == 'success'
      return render json: { data: {
          isMaintenance: false, nextResetStartAt: nil
        } }, status: :ok
    end

    # 以外は全てメンテナンス中
    # ステータスが not_started（0）かつ scheduled_start_timeが現在時刻よりも前の場合，statusを preparing（1）に更新
    if latest_schedule.status == 'not_started' && latest_schedule.scheduled_start_time < Time.current
      latest_schedule.update!(status: 1)
      Rails.logger.info "[INFO] リセット実行スケジュールのステータスを preparing に更新しました。"
    end 
    
    return render json: { data: { 
        isMaintenance: true, nextResetStartAt: nil
      } }, status: :ok
  end

  # POST /api/v1/system/reset
  def reset
    result = WorldResetter.call
    render json: { result: result }, status: :ok
  end
end