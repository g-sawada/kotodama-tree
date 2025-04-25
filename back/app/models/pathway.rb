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
    self.color  ||= ["#377ae8", "#2e41ea", "#8119ee", "#b525c1", "#d72e67", "#cd4121", "#bf6128", "#937f2b", "#479f2e", "#52b234", "#439b4c", "#3f8b93"].sample # カラーをランダムに選択
  end
end
