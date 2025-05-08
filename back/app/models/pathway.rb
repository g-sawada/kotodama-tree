class Pathway < ApplicationRecord
  belongs_to :room_1, class_name: 'Room', foreign_key: 'room_1_id'
  belongs_to :room_2, class_name: 'Room', foreign_key: 'room_2_id'

  with_options presence: true do
    validates :room_1_id, uniqueness: { scope: :room_2_id }
    validates :room_2_id
  end

  # インスタンス作成時にデフォルト値を設定
  after_initialize :set_default_values

  private

  def set_default_values
    self.figure_type ||= rand(1..10) # 1から10のランダムな整数
    self.color  ||= ["#FF0033", "#FF6600", "#FF9900", "#FFCC00", "#CCFF00", "#33FF00", "#00FF99", "#00FFFF", "#0066FF", "#3300FF", "#6600CC", "#990066"].sample # カラーをランダムに選択
  end
end
