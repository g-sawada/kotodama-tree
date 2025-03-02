class User < ApplicationRecord
  has_many :owner_souls, class_name: 'Soul', foreign_key: 'owner_id'
  has_many :creator_souls, class_name: 'Soul', foreign_key: 'creator_id', dependent: :destroy
  has_many :favorites
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
end
