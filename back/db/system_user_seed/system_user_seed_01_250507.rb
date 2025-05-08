require 'json'

def create_user(name)
  user = User.new(
    name: name,
    max_create_souls: 9,
    max_carry_souls: 9,
    provider: "system",
    provider_id: SecureRandom.random_number(10**16).to_s.rjust(16, '0'),
    system_user: "system"
  )

  user.save(validate: false) # バリデーションをスキップして保存
  return user
end

def create_soul(content, creator_id)
  Soul.create!(
    content: content, 
    creator_id: creator_id,
    owner_id: nil,
    home_tree_id: nil,
    captured_tree_id: nil
  )
end

file_path = Rails.root.join('db', 'system_user_seed', 'system_user_seed_01_250507.json')
json_data = JSON.parse(File.read(file_path))

json_data.each do |user_data|
  # ユーザーを作成
  user = create_user(user_data["name"])
  user_souls = user_data["souls"]

  # コトダマを作成
  user_souls.each do |soul_data|
    content = soul_data["content"]
    create_soul(content, user.id)
  end

  # ユーザーの部屋とキを作成(存在しないと世界リセット時にエラーになる)
  Room.create!(
    user_id: user.id
  )
  Tree.create!(
    user_id: user.id,
    room_id: user.room.id,
  )
end

# 非メンテナンス中となるようにResetScheduleを作成
ResetSchedule.create!(status: :success, scheduled_start_time: Time.current)

puts "[SUCCESS] システムユーザーを #{json_data.size} 人作成しました。"