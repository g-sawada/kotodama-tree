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

  CHARGE_INTERVAL = 1.hour.freeze

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

  # 経験値加算メソッド(レベル更新処理を含む)
  def add_exp(exp)
    current_level = self.level
    self.exp += exp
    after_level = self.current_level

    # 加算前と加算後のレベルを比較し，異なる場合はレベルを更新
    if current_level != after_level
      self.level = after_level
    end

    self.save!
  end

  # プログレスバーに表示する割合を計算するメソッド
  def exp_progress_percent
    #カンストした場合に100を返す
    return 100 if level == LEVEL_TABLE.size
    # 現在のレベルになる基準のexpを取得（例：　expが12の場合10を取得する）
    level_min_exp = LEVEL_TABLE[level - 1]
    # 次のレベルになるためのexpを取得する（例：　expが12の場合20を取得する）
    level_max_exp = LEVEL_TABLE[level]
    # rubyの仕様上、整数除算されるためexpをfloat型に、計算後に除算する
    # 現在のレベル帯の経験値の進捗だけで割合を算出(expが12の場合は20％となる)
    ((exp - level_min_exp).to_f / (level_max_exp - level_min_exp) * 100).floor
  end
end
