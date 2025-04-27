class ResetSchedule < ApplicationRecord
  enum :status, {
    not_started: 0,
    preparing: 1,
    running: 2,
    success: 3,
    failure: 8,
    system_error: 9
  }

  validates :status, presence: true

  # インスタンス作成時にデフォルト値を設定
  after_initialize :set_default_values

  private

  def set_default_values
    self.status ||= :not_started
  end
end