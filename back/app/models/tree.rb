class Tree < ApplicationRecord
  belongs_to :user
  belongs_to :room
  has_many :home_tree_souls, class_name: 'Soul', foreign_key: 'home_tree_id'
  has_many :captured_tree_souls, class_name: 'Soul', foreign_key: 'captured_tree_id'

  with_options presence: true do
    validates :level, numericality: { only_integer: true, greater_than_or_equal_to: 1 }
    validates :exp, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
    validates :image
  end

  with_options presence: true, uniqueness: true do
    validates :user_id
    validates :room_id
  end

  # レベルの経験値しきい値を定義するテーブル。index+1がレベルに対応
  LEVEL_TABLE = [0, 10,  20,  30,  40,  50,
                    70,  90,  110, 130, 150,
                    180, 210, 240, 270, 300,
                    340, 380, 420, 460, 500,
                ]

  # 現在のレベルを取得するメソッド
  def get_current_level()
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

  # 経験値加算メソッド(レベル更新処理を含む)
  def add_exp(exp)
    current_level = get_current_level()
    self.exp += exp
    after_level = get_current_level()

    # 加算前と加算後のレベルを比較し，異なる場合はレベルを更新
    if current_level != after_level
      self.level = after_level
    end

    self.save!
  end

end
