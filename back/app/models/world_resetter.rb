class WorldResetter
  def self.call
    start_time = Time.current
    message = ''
    begin
      ActiveRecord::Base.transaction do
        # TODO: バックアップ処理
        # 全てのユーザーのレベルアップ処理（経験値加算処理）を行う
        update_users_level
        message = "全てのユーザーのレベルを更新しました"
        # 全てのsoulのowner_idをnilにする
        Soul.update_all(owner_id: nil)
        message = "全てのsoulのowner_idをnilにしました"
        # 全てのsoulのcaptured_tree_idをnilにする
        Soul.update_all(captured_tree_id: nil)
        message = "全てのsoulのcaptured_tree_idをnilにしました"
        # 全てのsoulのhome_tree_idをnilにする
        Soul.update_all(home_tree_id: nil)
        message = "全てのsoulのhome_tree_idをnilにしました"
        # 全てのuserのlast_visit_roomをnilにする
        User.update_all(last_visit_room: nil)
        message = "全てのuserのlast_visit_roomをnilにしました"

        # 全てのtreeを削除する
        Tree.delete_all
        message = "全てのtreeを削除しました"
        # 全てのpathwayを削除する
        Pathway.delete_all
        message = "全てのpathwayを削除しました"
        # 全てのroomを削除する
        Room.delete_all
        message = "全てのroomを削除しました"

        # 全てのuserのroomを再作成する
        create_users_room
        message = "全ユーザーのroomを再作成しました"
        # 全てのuserのtreeを再作成する
        create_users_tree
        message = "全ユーザーのtreeを再作成しました"
        # 部屋同士のネットワークを再構築する
        reconnect_rooms
        message = "pathwayを作成し，room同士を再接続しました"
        # 全てのsoulの，home_tree_idとcaptured_tree_idをuserのtree_idに設定する
        set_souls_tree_id
        message = "soulのhome_tree_idとcaptured_tree_idをuserのtree_idに設定しました"
      end
    rescue StandardError => e
      # 例外が発生した場合はロールバックされる
      message += "    エラーが発生しました: #{e.message}"
    end
    end_time = Time.current
    return { 
        message: message,
        start_time: start_time,
        end_time: end_time
      }
  end

  # 全ユーザーのレベルアップ処理（経験値加算）をまとめて実行するメソッド
  def self.update_users_level
    batch_size = 200
    user_attributes = []
    # ユーザーとそのtreeを規定のバッチサイズで取得し，経験値追加後のattributeを取得
    User.includes(:tree).find_each(batch_size: batch_size) do |user|
      # ユーザーのtreeの"level"をuserのexpに追加し，インスタンスを更新
      user.add_exp(user.tree.level)
      # attributesを取得し，更新時間を上書き
      update_attributes = user.attributes.merge({
        "updated_at" => Time.current
      })
      user_attributes << update_attributes
      # バッチサイズに達したらupdate_allし，メモリを解放する
      if user_attributes.size >= batch_size
        # NOTE: Rails 6.0以降ではupsert_allを使用可。衝突時はUPDATE，非衝突時はINSERT
        User.upsert_all(user_attributes)
        user_attributes.clear
      end
    end
    # 残りのレコードをUPDATE
    User.upsert_all(user_attributes) unless user_attributes.empty?
  end

  # 全ユーザーのroomをまとめて作成するメソッド
  def self.create_users_room
    batch_size = 200
    room_attributes = []
    # ユーザーを規定のバッチサイズで取得し，roomを作成する
    User.find_each(batch_size: batch_size) do |user|
      room_attributes << {
        user_id: user.id,
        # NOTE: id, created_at, updated_atは自動で生成されるので指定しなくてよい
      }
      # バッチサイズに達したらINSERTし，メモリを解放する
      if room_attributes.size >= batch_size
        Room.insert_all!(room_attributes)
        room_attributes.clear
      end
    end
    # 残りのレコードをINSERT
    Room.insert_all!(room_attributes) unless room_attributes.empty?
    room_attributes.clear
  end

  # 全ユーザーのtreeをまとめて作成するメソッド
  def self.create_users_tree
    batch_size = 200
    tree_attributes = []
    # ユーザーを規定のバッチサイズで取得し，roomを作成する
    User.includes(:room).find_each(batch_size: batch_size) do |user|
      tree_attributes << {
        user_id: user.id,
        room_id: user.room.id,
        exp: 0,
        level: 1,
        # TODO: ランダムな画像を選択する処理を追加する
        image: 'tree.svg',
        last_charged_at: nil,
        # NOTE: id, created_at, updated_atは自動で生成されるので指定しなくてよい
      }
      # バッチサイズに達したらINSERTし，メモリを解放する
      if tree_attributes.size >= batch_size
        Tree.insert_all!(tree_attributes)
        tree_attributes.clear
      end
    end
    # 残りのレコードをINSERT
    Tree.insert_all!(tree_attributes) unless tree_attributes.empty?
    tree_attributes.clear
  end

  # 全てのsoulのhome_tree_idとcaptured_tree_idを，userのtree_idに設定するメソッド
  def self.set_souls_tree_id
    batch_size = 10
    soul_attributes = []
    # ユーザーを起点にtreeとcreator_soulsを結合して取得し，ユーザーごとに更新を実行
    User.includes(:tree, :creator_souls).find_each(batch_size: batch_size) do |user|
      # ユーザーのtree_idを取得
      tree_id = user.tree.id
      user.creator_souls.each do |soul|
        # 更新対象の属性を設定
        # NOTE: シンボルではなく，文字列で指定する
        update_attributes = {
          "home_tree_id" => tree_id,
          "captured_tree_id" => tree_id,
          "updated_at" => Time.current
        }
        # 現在の属性を下敷きにして，更新対象の属性をマージ
        # NOTE: 更新対象の属性を渡すだけだと，not null制約が発生したので修正
        soul_attributes << soul.attributes.merge(update_attributes)
      end
      # バッチサイズに達したらupdate_allし，メモリを解放する
      if soul_attributes.size >= batch_size
        # NOTE: Rails 6.0以降ではupsert_allを使用可。衝突時はUPDATE，非衝突時はINSERT
        Soul.upsert_all(soul_attributes)
        soul_attributes.clear
      end
    end
    # 残りのレコードをUPDATE
    Soul.upsert_all(soul_attributes) unless soul_attributes.empty?
  end

  # pathwayを作成し，room同士のネットワークを再構成するメソッド
  def self.reconnect_rooms
    # 全てのroomのid配列をランダムに取得
    shuffle_room_ids = Room.pluck(:id).shuffle
    
    # STEP 1: n番目とn+1番目のroomをpathwayで接続する
    pathway_attributes = []
    shuffle_room_ids.each_with_index do |room_id, index|
      # 最後の要素は最初の要素と接続する
      if index == shuffle_room_ids.size - 1
        this_room_id = room_id
        next_room_id = shuffle_room_ids[0]
      else
        this_room_id = room_id
        next_room_id = shuffle_room_ids[index + 1]  
      end
      # room_1_idとroom_2_idをソートし，必ずroom_1 < room_2となるようにして保存
      smaller_room_id, larger_room_id = [this_room_id, next_room_id].sort
      pathway_attributes << {
        room_1_id: smaller_room_id,
        room_2_id: larger_room_id,
        figure_type: rand(1..3),
        color: ["#FFB6C1", "#FFD700", "#98FB98", "#ADD8E6", "#FF69B4", "#FF6347", "#E6E6FA", "#DDA0DD"].sample
        # TODO: figure_typeとcolorのランダム設定処理を，クラスメソッドとして実装して共通化する
      }
    end
    # pathway_attributesをバルクインサートする
    Pathway.insert_all!(pathway_attributes)
    pathway_attributes.clear

    # STEP2: 追加で，全体の40%のroomが追加でランダムな相手とpathwayをもつようにする(room数の20%の回数，繰り返し実行すればよい) 
    add_pathway_attributes = []
    # サンプリング対象となる配列を別途管理。追加登録済みのroom_idはここから除外していく
    sample_targets = shuffle_room_ids.dup
    # 追加でpathwayを作成するroomの数を算出
    add_pathway_count = (shuffle_room_ids.size * 0.2).to_i
    # puts "追加でpathwayを作成するroomの数: #{add_pathway_count}回"
    add_pathway_count.times do
      # puts "ただいまのsample_targetsの数: #{sample_targets.size}"
      # ランダムに1つをサンプリング。ただし元の配列の最初と最後の要素は除外した中から選ぶ(前後の要素を除外する処理が複雑化するため)
      sampled_room_1 = (sample_targets - [shuffle_room_ids.first, shuffle_room_ids.last]).sample
      # 元の配列のうち，自分自身と前後の要素を除外した中からランダムに1つのroomをサンプリングする
      # → 前後の要素とはSTEP1で接続済みのため
      prev_room = shuffle_room_ids[shuffle_room_ids.index(sampled_room_1) - 1]
      next_room = shuffle_room_ids[shuffle_room_ids.index(sampled_room_1) + 1]
      sampled_room_2 = (sample_targets - [sampled_room_1, prev_room, next_room]).sample
      # puts "sampled_room_1: #{sampled_room_1}, sampled_room_2: #{sampled_room_2}"
      # room_1_idとroom_2_idをソートし，必ずroom_1 < room_2となるようにして保存
      smaller_room_id, larger_room_id = [sampled_room_1, sampled_room_2].sort
      add_pathway_attributes << {
        room_1_id: smaller_room_id,
        room_2_id: larger_room_id,
        figure_type: rand(1..3),
        color: ["#FFB6C1", "#FFD700", "#98FB98", "#ADD8E6", "#FF69B4", "#FF6347", "#E6E6FA", "#DDA0DD"].sample
      }

      # ループの先頭に戻る前に，登録した2つのidを, サンプリング対象から破壊的に削除する
      sample_targets.delete(sampled_room_1)
      sample_targets.delete(sampled_room_2)
      # puts "sample_targets: #{sample_targets}"
    end
    # add_pathway_attributesをバルクインサートする
    Pathway.insert_all!(add_pathway_attributes) if add_pathway_attributes.any?
    add_pathway_attributes.clear
  end
end