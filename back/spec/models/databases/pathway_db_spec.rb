require 'rails_helper'

RSpec.describe Pathway, type: :model do
  subject { build(:pathway) }

  let(:room_1) { create(:room) }
  let(:room_2) { create(:room) }

  before do
    subject.room_1 = room_1
    subject.room_2 = room_2
  end

  describe 'データベース制約' do
    context '正常に保存、削除できること' do
      it 'バリデーションを通過し、保存、削除できること' do
        expect(subject.save).to be_truthy
        subject.destroy
        expect { subject.reload }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context 'room_1_idに関する制約' do
      it 'nilの場合に保存されないこと' do
        room_1.destroy
        expect{ subject.save(validate: false) }.to raise_error(ActiveRecord::InvalidForeignKey)
        expect(Pathway.exists?(subject.id)).to be_falsey
      end
    end

    context 'room_2_idに関する制約' do
      it 'nilの場合に保存されないこと' do
        room_2.destroy
        expect{ subject.save(validate: false) }.to raise_error(ActiveRecord::InvalidForeignKey)
        expect(Pathway.exists?(subject.id)).to be_falsey
      end
    end

    context '一意制約' do
      it 'room_1_id, room_2_idの組み合わせが一意であること' do
        subject.save(validate: false)
        duplicate_subject = build(:pathway, room_1_id: subject.room_1.id, room_2_id: subject.room_2.id)
        expect{ duplicate_subject.save(validate: false) }.to raise_error(ActiveRecord::RecordNotUnique)
      end
    end
  end
end
