require 'rails_helper'

RSpec.describe Pathway, type: :model do
  subject { build(:pathway) }

  let(:room_1) { create(:room) }
  let(:room_2) { create(:room) }

  before do
    subject.room_1 = room_1
    subject.room_2 = room_2
  end

  describe 'バリデーション' do
    context 'room_1_idに関するバリデーション' do
      it '空の場合は無効' do
        subject.room_1_id = '' 
        expect(subject).to be_invalid
      end
    end

    context 'room_2_idに関するバリデーション' do
      it '空の場合は無効' do
        subject.room_2_id = ''
        expect(subject).to be_invalid
      end
    end
  end
end
