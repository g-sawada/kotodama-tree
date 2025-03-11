require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do
  # 0311 /indexは デモとして作成
  describe "GET /index" do
    context '有効なデータがある場合' do
      before(:all) do
        ActiveRecord::Tasks::DatabaseTasks.truncate_all
        Rails.application.load_seed
        # seed実行後のユーザー数を取得
        @default_user_count = User.count
      end

      it "ステータス200が返ること" do
        get api_v1_users_path
        expect(response).to have_http_status(200)
      end

      it "ユーザー数がseed作成数であること" do
        get api_v1_users_path
        json = JSON.parse(response.body)
        expect(json.length).to eq(@default_user_count)
      end
    end

    context '有効なデータがない場合' do
      before do
        ActiveRecord::Tasks::DatabaseTasks.truncate_all
      end

      it "空の配列が返ること" do
        get api_v1_users_path
        json = JSON.parse(response.body)
        expect(json).to be_empty
      end
    end
  end

  # describe "GET /show" do
  #   it "returns http success" do
  #     get "/api/v1/users/show"
  #     expect(response).to have_http_status(:success)
  #   end
  # end

  describe "GET /create" do
    context '有効なパラメータの場合' do
      before(:all) do
        ActiveRecord::Tasks::DatabaseTasks.truncate_all
        Rails.application.load_seed
        # seed実行後のユーザー数を取得
        @default_user_count = User.count

        post api_v1_users_path, params: {
          user: {
            name: "test_user",
            provider: "github",
            provider_id: "111111111"
          }
        }
      end

      it "ステータス201が返ること" do
        expect(response).to have_http_status(201)
      end

      it "総ユーザー数が+1されていること" do
        expect(User.count).to eq(@default_user_count + 1)
      end

      it "作成Userが存在すること" do
        user = User.find_by(name: "test_user")
        expect(user).to be_present
      end

      it "作成Userのname, provider, provider_idがパラメータと一致すること" do
        json = JSON.parse(response.body)
        user = User.find(json['id'])
        expect(user.name).to eq("test_user")
        expect(user.provider).to eq("github")
        expect(user.provider_id).to eq("111111111")
      end

      it "作成UserのRoomが存在すること" do
        json = JSON.parse(response.body)
        user = User.find(json['id'])
        expect(user.room).to be_present
      end

      it "作成UserのRoomが1つのPathwayを持つこと" do
        json = JSON.parse(response.body)
        user = User.find(json['id'])
        room = user.room
        # 作成されたpathwayのroom_1_idとroom_2_idのいずれかにroom.idが入るため，合計が1であること
        expect(room.room_1_pathways.count + room.room_2_pathways.count).to eq(1)
      end

      it "作成UserのTreeが存在すること" do
        json = JSON.parse(response.body)
        user = User.find(json['id'])
        expect(user.tree).to be_present
      end
    end

    context '無効なパラメータの場合' do
      before(:all) do
        ActiveRecord::Tasks::DatabaseTasks.truncate_all
        Rails.application.load_seed
        # seed実行後のユーザー数を取得
        @default_user_count = User.count

        # 例としてnameが空のパラメータを送信
        post api_v1_users_path, params: {
          user: {
            name: "",
            provider: "github",
            provider_id: "111111111"
          }
        }
      end

      it "ステータス422(Unprocessable Content)が返ること" do
        expect(response).to have_http_status(422)
      end

      it "総ユーザー数が変わらないこと" do
        expect(User.count).to eq(@default_user_count)
      end
    end

    context '既存データ（room）が存在しない場合' do
      before(:all) do
        # 既存データを全て削除
        ActiveRecord::Tasks::DatabaseTasks.truncate_all
        @default_user_count = User.count
        @default_room_count = Room.count
        @default_tree_count = Tree.count
        @default_pathway_count = Pathway.count

        post api_v1_users_path, params: {
          user: {
            name: "test_user",
            provider: "github",
            provider_id: "111111111"
          }
        }
      end

      it "ステータス500とエラーメッセージが返ること" do
        expect(response).to have_http_status(500)
        expect(response.body).to include("他のroomを取得できません")
      end

      it "User,Room,Tree,Pathwayの各データの数が変わらないこと" do
        expect(User.count).to eq(@default_user_count)
        expect(User.count).to eq(@default_room_count)
        expect(User.count).to eq(@default_tree_count)
        expect(User.count).to eq(@default_pathway_count)
      end
    end
  end

  # describe "GET /destroy" do
  #   it "returns http success" do
  #     get "/api/v1/users/destroy"
  #     expect(response).to have_http_status(:success)
  #   end
  # end
end
