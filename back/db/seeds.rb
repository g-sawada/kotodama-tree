require 'faker'

# 各モデルのデータを作成するメソッド
def create_dummy_user(name)
  User.create!(
    name: name,
    level: 1,
    exp: 0,
    max_create_souls: 7,
    max_carry_souls: 7,
    provider: "google",
    provider_id: Faker::Alphanumeric.alphanumeric(number: 10)
  )
end

def create_dummy_room(user)
  room = Room.create!(
    user_id: user.id
  )
  user.update!(last_visit_room: room.id) # ユーザーのlast_visit_roomを更新
end

def create_dummy_tree(user)
  Tree.create!(
    user_id: user.id,
    room_id: user.room.id,
    image: "tree.svg"
  )
end

def create_dummy_pathway(room_1, room_2)
  # 重複排除のため，2つのroom_idをソートしてから保存
  smaller_room_id, larger_room_id = [room_1.id, room_2.id].sort

  Pathway.create!(
    figure_type: rand(1..10), # 1から3のランダムな整数
    color: ["#377AE8", "#2E41EA", "#8119EE", "#B525C1", "#D72E67", "#CD4121", "#BF6128", "#937F2B", "#479F2E", "#52B234", "#439B4C", "#3F8B93"].sample, # カラーをランダムに選択
    room_1_id: smaller_room_id,
    room_2_id: larger_room_id
  )
end

def create_dummy_soul(creator_id, owner_id, home_tree_id, captured_tree_id)
  Soul.create!(
    content: Faker::Lorem.sentence, 
    harvested_count: 0,
    creator_id: creator_id,
    owner_id: owner_id,
    home_tree_id: home_tree_id,
    captured_tree_id: captured_tree_id
  )
end

# ユーザーをN人作成
SEED_N_USERS = ENV["SEED_N_USERS"] || 20
users = SEED_N_USERS.to_i.times.map do |i|
  create_dummy_user("だみーゆーざー #{i + 1}")
end

# ユーザーごとに部屋とキを作成
# ユーザーのlast_visit_roomを作成した部屋のidにする
users.each do |user|
  create_dummy_room(user)
  create_dummy_tree(user)
end

# 部屋と部屋をつなぐpathwayを作成
rooms = Room.all
rooms.each_with_index do |room, index|
  next_room = rooms[(index + 1) % rooms.length] # 配列の最後の要素の次は最初の要素
  create_dummy_pathway(room, next_room)
end

# Soulを作成
users.each do |user|
  # 自身が所持している状態のSoulを作成
  create_dummy_soul(creator_id = user.id, owner_id = user.id, home_tree_id = user.tree.id, captured_tree_id = nil)

  # 自分のキに捧げられている状態のSoulを作成
  create_dummy_soul(creator_id = user.id, owner_id = nil, home_tree_id = user.tree.id, captured_tree_id = user.tree.id)

  # 他のユーザーが所持している状態のSoulを作成
  other_user = users[(users.index(user) + 1) % users.length] # 自分の次のユーザー。最後の次は最初へ
  create_dummy_soul(creator_id = user.id, owner_id = other_user.id, home_tree_id = user.tree.id, captured_tree_id = nil)

  # 他のユーザーのキに捧げられている状態のSoulを作成
  create_dummy_soul(creator_id = user.id, owner_id = nil, home_tree_id = user.tree.id, captured_tree_id = other_user.tree.id)
end

# Favoriteを作成
# 2人のユーザーが自分以外のユーザーのSoulを1つずつお気に入り登録
souls = Soul.all
two_users = users[0..1]
two_users.each do |user|
  souls.each do |soul|
    if soul.creator_id != user.id
      user.favorites.create!(soul_id: soul.id)
    end
  end
end

puts "seed data successfully created!"

