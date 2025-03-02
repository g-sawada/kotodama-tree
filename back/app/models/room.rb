class Room < ApplicationRecord
  has_one :tree
  belongs_to :user, optional: true
  has_many :room_1_pathways, class_name: 'Pathway', foreign_key: 'room_1_id', dependent: :destroy
  has_many :room_2_pathways, class_name: 'Pathway', foreign_key: 'room_2_id', dependent: :destroy

  validates :user_id, uniqueness: true
end
