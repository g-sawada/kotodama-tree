class Soul < ApplicationRecord
  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id', optional: true
  belongs_to :creator, class_name: 'User', foreign_key: 'creator_id'
  belongs_to :home_tree, class_name: 'Tree', foreign_key: 'home_tree_id', optional: true
  belongs_to :captured_tree, class_name: 'Tree', foreign_key: 'captured_tree_id', optional: true
  has_many :favorites, dependent: :destroy

  with_options presence: true do
    validates :creator_id
    validates :content, length: { maximum: 80 }
    with_options numericality: { only_integer: true, greater_than_or_equal_to: 0 } do
      validates :harvested_count
    end
  end

  # 経験値算出時の係数（coefficient: COEF)を定数として定義
  COEF_HARVESTED_COUNT = 3.freeze
  COEF_FAVORITES_COUNT = 1.freeze

  # 経験値算出メソッド
  def exp
    harvested_count * COEF_HARVESTED_COUNT + favorites.count * COEF_FAVORITES_COUNT
  end
end
