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

  
end
