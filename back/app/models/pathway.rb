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
    self.figuretype ||= 1
    self.color  ||= "#000000"
  end
end
