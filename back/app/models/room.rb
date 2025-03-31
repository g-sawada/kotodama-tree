class Room < ApplicationRecord
  has_one :tree
  belongs_to :user, optional: true
  has_many :room_1_pathways, class_name: 'Pathway', foreign_key: 'room_1_id', dependent: :destroy
  has_many :room_2_pathways, class_name: 'Pathway', foreign_key: 'room_2_id', dependent: :destroy

  validates :user_id, uniqueness: true

  # 自身とpathwayで繋がるroomの配列を取得
  def linked_rooms
    linked_rooms = []

    # 自身がroom_1のpathwayを取得し，pathwayのroom_2_idからroomを取得
    self.room_1_pathways.each do |pathway|
      linked_rooms << Room.find(pathway.room_2_id)
    end
    # 自身がroom_2のpathwayを取得し，pathwayのroom_1_idからroomを取得
    self.room_2_pathways.each do |pathway|
      linked_rooms << Room.find(pathway.room_1_id)
    end
    # NOTE: room_1とroom_2でUNIQUE制約があるため，重複排除は不要
    linked_rooms
  end

  # 指定したroomとpathwayを作成
  def create_pathway_with!(room)
    # UNIQUEのため，2つのroom_idをソートしてから保存
    smaller_room_id, larger_room_id = [self.id, room.id].sort

    Pathway.create!(
      room_1_id: smaller_room_id,
      room_2_id: larger_room_id
    )
  end

  # ランダムなroomとpathwayを作成
  def create_pathway_random!
    other_rooms = Room.where.not(id: self.id)
    # 他のroomが存在しない場合は例外を発生させる
    raise StandardError, "他のroomを取得できませんでした。" if other_rooms.empty?

    # UNIQUE制約を満たす場合のみ保存し，満たさない場合はloop
    loop do
      other_room = other_rooms.sample

      # UNIQUEのため，2つのroom_idをソート
      smaller_room_id, larger_room_id = [self.id, other_room.id].sort
      pathway = Pathway.new(room_1_id: smaller_room_id, room_2_id: larger_room_id)
      
      if pathway.valid?
        pathway.save!
        break
      end
      # puts "pathwayは重複しているためloopします: #{pathway.errors.full_messages}"
    end
  end
end
