require 'rails_helper'

RSpec.describe "Api::V1::Rooms", type: :request do
  describe "GET /show" do
    before(:each) do
      @target_room = create(:room)
      @tree = create(:tree, room: @target_room)

      # 他にroomを3つ作成
      room1 = create(:room)
      room2 = create(:room)
      room3 = create(:room)

      # target_roomとの間にpathwayを作成
      @target_room.create_pathway_with!(room1)
      @target_room.create_pathway_with!(room2)
      @target_room.create_pathway_with!(room3)
    end

    context 'パラメータに有効なidがある場合' do      
      it "ステータス200が返ること" do
        get "/api/v1/rooms/#{@target_room[:id]}"
        expect(response).to have_http_status(200)
      end

      it "room, room.tree.idのデータが取得できること" do
        get "/api/v1/rooms/#{@target_room[:id]}"
        json = JSON.parse(response.body)
        expect(json['data']['room']['id']).to eq(@target_room.id)
        expect(json['data']['tree']['id']).to eq(@tree.id)
      end

      it "pathwaysが正しいデータ数で取得できること" do
        get "/api/v1/rooms/#{@target_room[:id]}"
        json = JSON.parse(response.body)
        expect(json['data']['pathways'].length).to eq(3)
      end
    end

    context 'パラメータのidのroomが存在しない場合' do
      it "ステータス404が返ること。dataがnilであること" do
        get "/api/v1/rooms/999999"
        expect(response).to have_http_status(404)
        json = JSON.parse(response.body)
        expect(json['data']).to be_nil
      end
    end
  end
end
