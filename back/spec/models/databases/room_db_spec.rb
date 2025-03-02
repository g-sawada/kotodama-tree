require 'rails_helper'

RSpec.describe Room, type: :model do
  subject { build(:room) }

  let(:user) { create(:user) }

  before do
    subject.user = user
  end

  describe 'データベース制約' do
    context 'バリデーションを通過しdbに正常に保存できること' do
      it '必須項目が入っている場合は保存できること' do
        expect(subject.save).to be_truthy
        expect(Room.last.attributes.except('created_at', 'updated_at')).to eq(subject.attributes.except('created_at', 'updated_at'))
      end
    end

    context 'user_idに関する制約' do
      it '異なるuser_idならroomを作成できる' do
        subject.save(validate: false)
        other_room = build(:room)
        expect(other_room.save(validate: false)).to be_truthy
        expect(Room.exists?(other_room.id)).to be_truthy
      end

      it 'ユーザーは複数のroomを作成できない' do
        subject.save(validate: false)
        other_room = build(:room, user_id: subject.user.id)
        expect{ other_room.save(validate: false) }.to raise_error(ActiveRecord::RecordNotUnique)
      end

      it 'ユーザーを削除した場合にuser_idがnilになること' do
        subject.save(validate: false)
        user.destroy
        subject.reload
        expect(subject.user_id).to be_nil
      end
    end
  end
end
