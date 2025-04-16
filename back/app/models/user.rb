class User < ApplicationRecord
  has_many :owner_souls, class_name: 'Soul', foreign_key: 'owner_id'
  has_many :creator_souls, class_name: 'Soul', foreign_key: 'creator_id', dependent: :destroy
  has_many :favorites
  has_many :favorites_souls, through: :favorites, source: :soul
  has_one :tree, dependent: :destroy
  has_one :room

  with_options presence: true do
    validates :name, length: { maximum: 20 }
    validates :level, numericality: { only_integer: true, greater_than_or_equal_to: 1 }
    validates :exp, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
    validates :max_create_souls
    validates :max_carry_souls
    validates :provider
    validates :provider_id, uniqueness: { scope: :provider }
  end

  # インスタンス作成時にデフォルト値を設定
  after_initialize :set_default_values
  
=begin
  # いいね数(いいねされた回数)のロジック
  def sum_of_likes
    return 0 if creator_souls.blank?
    
    creator_soul_ids = creator_souls.pluck(:id)
    Favorite.where(soul_id: creator_soul_ids).count
  end
=end

  def favorite(soul)
    favorites_souls << soul
  end

  def unfavorite(soul)
    favorites_souls.delete(soul)
  end

  def favorite?(soul)
    favorites_souls.include?(soul)
  end

  private

  def set_default_values
    self.max_create_souls ||= 3
    self.max_carry_souls  ||= 3
  end
end
