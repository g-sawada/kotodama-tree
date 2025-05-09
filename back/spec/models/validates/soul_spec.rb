require 'rails_helper'

RSpec.describe Soul, type: :model do
  subject { build(:soul) }

  let(:creator) { create(:user) }
  let(:home_tree) { create(:tree) }

  before do
    subject.creator = creator
    subject.owner = creator
    subject.home_tree = home_tree
    subject.captured_tree = home_tree
  end

  describe 'バリデーション' do
    context 'contentに関するバリデーション' do
      it '空の場合は無効' do
        subject.content = ''
        expect(subject).to be_invalid
      end
    end

    context 'harvested_countに関するバリデーション' do
      it '空の場合は無効' do
        subject.harvested_count = ''
        expect(subject).to be_invalid
      end

      it '整数でない場合は無効' do
        subject.harvested_count = 'abc'
        expect(subject).to be_invalid
      end

      it '負の整数の場合は無効' do
        subject.harvested_count = -1
        expect(subject).to be_invalid
      end

      it '小数の場合は無効' do
        subject.harvested_count = 1.2
        expect(subject).to be_invalid
      end
    end

    context 'creator_idに関するバリデーション' do
      it '空の場合は無効' do
        subject.creator_id = ''
        expect(subject).to be_invalid
      end
    end

    context 'owner_idに関するバリデーション' do
      it '空の場合でも登録できること' do
        subject.owner_id = ''
        expect(subject).to be_valid
      end
    end

    context 'home_tree_idに関するバリデーション' do
      it '空の場合でも登録できること' do
        subject.home_tree_id = ''
        expect(subject).to be_valid
      end
    end

    context 'captrued_tree_idに関するバリデーション' do
      it '空の場合でも登録できること' do
        subject.captured_tree_id = ''
        expect(subject).to be_valid
      end
    end
  end
end
