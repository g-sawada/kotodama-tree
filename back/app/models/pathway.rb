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
    self.color  ||= ["#377AE8", "#2E41EA", "#8119EE", "#B525C1", "#D72E67", "#CD4121", "#BF6128", "#937F2B", "#479F2E", "#52B234", "#439B4C", "#3F8B93"].sample # カラーをランダムに選択
  end
end
