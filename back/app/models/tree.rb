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

  # キの画像ファイル名をサイズ別に格納するテーブル
  SMALL_TREE_FILENAME = ["s_baobab_exfif9ps.png", "s_conifer_wjip682c.png", "s_gajyumaru_fr5ixjr7.png", "s_palm_w8tg9dtm.png", "s_seedling1_idmk9346.png", "s_seedling2_4ejmgnn6.png", "s_white_birch_st27zpz4.png", "s_sprout_bug_nm8nrgsk.png"]

  MEDIUM_TREE_FILENAME = ["m_baobab_jsd55mud.png", "m_bonsai_kjzgyw73.png", "m_colorful_wfy63xcf.png", "m_conifer_wm382zrx.png", "m_drasena_ybdbzcar.png", "m_palm_bw7kaykh.png", "m_tree_64ajkp48.png", "m_tropical_7b3ys2ye.png", "m_white_birch_b7c4fuzx.png", "m_yellow_tree_f99iczxy.png"]

  LARGE_TREE_FILENAME = ["l_baobab_3a44nrbd.png", "l_christmas_tree_2nbhahbh.png", "l_conifer_kj6kwsjd.png", "l_sakura_u7kbdgj5.png", "l_white_birch_4jit66ry.png"]

  # キのレベルを元にキの画像サイズを定義するハッシュ
  TREE_SIZE_HASH = {s: 0, m: 6, l: 16}

  # Treeインスタンス作成時にimageカラムにSサイズのキの画像をランダムを設定
  after_initialize :set_small_tree_image


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

  # 現在のサイズテーブルを取得するメソッド
  def current_size_table(level)
    table = SMALL_TREE_FILENAME
    if TREE_SIZE_HASH[:l] <= level
      table = LARGE_TREE_FILENAME
    elsif TREE_SIZE_HASH[:m] <= level
      table = MEDIUM_TREE_FILENAME
    end
    return table
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

    # 加算前と加算後のサイズテーブルを比較し、異なる場合はキの画像を更新
    current_size_table = current_size_table(current_level)
    after_size_table = current_size_table(after_level)
    if current_size_table != after_size_table
      self.image = "/tree_images/" + after_size_table.sample # キの画像をランダムに選択
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


  private

  def set_small_tree_image
    self.image  ||= "/tree_images/" + SMALL_TREE_FILENAME.sample # Sサイズのキの画像をランダムに選択
  end
end
