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
  
  # レベルの経験値しきい値を定義するテーブル。index+1がレベルに対応
  LEVEL_TABLE = [ 0,   10,   20,   30,   50,  
                  70,  100,  130,  160,  200
                ]
  # コトダマ作成数の上限を定義するテーブル。index+1がレベルに対応
  MAX_CREATE_SOULS_TABLE = [ 3, 4, 5, 5, 6, 6, 6, 7, 7, 8]
  # コトダマ所持数の上限を定義するテーブル。index+1がレベルに対応
  MAX_CARRY_SOULS_TABLE  = [ 2, 2, 2, 3, 3, 3, 4, 4, 4, 5]

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

  # 経験値加算処理
  # NOTE: WorldResetterから呼び出される前提で，メソッド内で更新は行わない
  def add_exp(exp)
    current_level = self.level
    self.exp += exp
    after_level = self.current_level
    # 加算前と加算後のレベルを比較し，異なる場合はレベル・ステータスを更新
    if current_level != after_level
      self.level = after_level
      # コトダマ作成数の上限を更新
      self.max_create_souls = MAX_CREATE_SOULS_TABLE[after_level - 1]
      # コトダマ所持数の上限を更新
      self.max_carry_souls = MAX_CARRY_SOULS_TABLE[after_level - 1]
    end
    self  # attributeを上書きしたインスタンス自身を返すのみ
  end
  
  private
  
  def set_default_values
    self.max_create_souls ||= MAX_CREATE_SOULS_TABLE.first
    self.max_carry_souls  ||= MAX_CARRY_SOULS_TABLE.first
  end

  # 現在のレベルを取得するメソッド
  def current_level
    # 初期値を宣言
    level = 1
    # レベルテーブルでループ。現在の経験値と比較し，breakするまで続ける
    LEVEL_TABLE.each_with_index do |_, index|
      # 配列の最後の要素まで到達した場合，最大レベルを返してbreak
      if LEVEL_TABLE[index + 1].nil?
        level = index + 1   # indexは0から始まるので+1
        break
      end
      # 現在の経験値(exp)が,テーブルの次のindexの値より小さい場合，現在のindex+1を返してbreak
      if LEVEL_TABLE[index + 1] > self.exp
        level = index + 1   # indexは0から始まるので+1
        break
      end
    end
    return level
  end

end
