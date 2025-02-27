require 'rails_helper'

RSpec.describe Soul, type: :model do
  subject { build(:soul) }

 describe 'バリデーション' do
  context 'contentに関するバリデーション' do
    it '空の場合は無効' do
      subject.content = ''
      expect(subject).to be_invalid
    end
  end

  context 'captured_countに関するバリデーション' do
    it '空の場合は無効' do
      subject.captured_count = ''
      expect(subject).to be_invalid
    end

    it '数値でない場合は無効' do
      subject.captured_count = 'abc'
      expect(subject).to be_invalid
    end

    it '負の整数の場合は無効' do
      subject.captured_count = -1
      expect(subject).to be_invalid
    end

    it '小数の場合は無効' do
      subject.captured_count = 1.2
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

    it '少数の場合は無効' do
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
 end
end
