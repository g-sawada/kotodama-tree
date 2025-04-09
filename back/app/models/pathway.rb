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
    self.figure_type ||= rand(1..3) # 1から3のランダムな整数
    self.color  ||= ["#FFB6C1", "#FFD700", "#98FB98", "#ADD8E6", "#FF69B4", "#FF6347", "#E6E6FA", "#DDA0DD"].sample # カラーをランダムに選択
  end
end
