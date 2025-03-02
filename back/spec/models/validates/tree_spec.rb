require 'rails_helper'

RSpec.describe Tree, type: :model do
  subject { build(:tree) }

  let(:room) { create(:room) }

  before do
    subject.user = room.user
    subject.room = room
  end

  describe 'バリデーション' do
    context 'levelに関するバリデーション' do
      it '空の場合は無効' do
        subject.level = ''
        expect(subject).to be_invalid
      end

      it '整数でない場合は無効' do
        subject.level = 'abc'
        expect(subject).to be_invalid
      end

      it '負の整数の場合は無効' do
        subject.level = -1
        expect(subject).to be_invalid
      end

      it '小数の場合は無効' do
        subject.level = 1.2
        expect(subject).to be_invalid
      end
    end

    context 'expに関するバリデーション' do
      it '空の場合は無効' do
        subject.exp = ''
        expect(subject).to be_invalid
      end

      it '整数でない場合は無効' do
        subject.exp = 'abc'
        expect(subject).to be_invalid
      end

      it '負の整数の場合は無効' do
        subject.exp = -1
        expect(subject).to be_invalid
      end

      it '小数の場合は無効' do
        subject.exp = 1.2
        expect(subject).to be_invalid
      end
    end

    context 'imageに関するバリデーション' do
      it '空の場合は無効' do
        subject.image = ''
        expect(subject).to be_invalid
      end
    end

    context 'user_idに関するバリデーション' do
      it '空の場合は無効' do
        subject.user_id = ''
        expect(subject).to be_invalid
      end
    end

    context 'room_idに関するバリデーション' do
      it '空の場合は無効' do
        subject.room_id = ''
        expect(subject).to be_invalid
      end
    end
  end
end
