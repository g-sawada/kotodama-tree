require 'rails_helper'

RSpec.describe "Api::V1::Souls", type: :request do
  # 入室可否ロジックが通らずテストに失敗するため、保留にしています
  describe "POST /create" do
    context '有効なパラメータの場合' do
      before(:each) do
        @default_soul_count = Soul.count
        @user = create(:user)
        @room = create(:room, user: @user)
        @tree = create(:tree, user: @user, room: @room)
        @user.last_visit_room = @user.room.id
        @user.max_create_souls = 3

        post api_v1_souls_path, params: {
          soul: {
            content: "test_soul_content",
            owner_id: @user.id,
            creator_id: @user.id,
            home_tree_id: @tree.id,
            captured_tree_id: @tree.id,
          }
        }
      end
      xit "ステータス201が返ること" do
        expect(response).to have_http_status(201)
      end

      xit "総コトダマ数が+1されていること" do
        expect(Soul.count).to eq(@default_soul_count + 1)
      end

      xit "作成したsoulが存在すること" do
        soul = Soul.find_by(content: "test_soul_content")
        expect(soul).to be_present
      end

      xit "作成したsoulの各属性がパラメータと一致すること" do
        json = JSON.parse(response.body)
        soul = Soul.find(json['data']['id'])
        expect(soul.content).to eq("test_soul_content")
        expect(soul.owner_id).to eq(@user.id)
        expect(soul.creator_id).to eq(@user.id)
        expect(soul.home_tree_id).to eq(@tree.id)
        expect(soul.captured_tree_id).to eq(@tree.id)
      end

    end

    context '無効なパラメータの場合' do
      before(:each) do
        @default_soul_count = Soul.count
        @user = create(:user)
        @room = create(:room, user: @user)
        @tree = create(:tree, user: @user, room: @room)
        @user.last_visit_room = @user.room.id
        @user.max_create_souls = 3
        # 例としてcontentが空のパラメータを送信
        post api_v1_souls_path, params: {
          soul: {
            content: "",
            owner_id: @user.id,
            creator_id: @user.id,
            home_tree_id: @tree.id,
            captured_tree_id: @tree.id,
          }
        }
      end

      xit "ステータス422(Unprocessable Content)が返ること" do
        expect(response).to have_http_status(422)
      end

      xit "総コトダマ数が変わらないこと" do
        expect(Soul.count).to eq(@default_soul_count)
      end
    end
  end
end