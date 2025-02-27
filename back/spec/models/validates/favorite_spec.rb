require 'rails_helper'

RSpec.describe Favorite, type: :model do
 subject { build_stubbed(:favorite) }

 describe 'バリデーション' do
  context '必須項目の値が正常に入っている場合' do
    it '有効であること' do
      expect(subject).to be_valid
    end
  end

  context 'user_idのバリデーション' do
    it '空の場合は無効' do
      subject.user_id = ''
      expect(subject).to be_invalid
    end
  end

  context 'soul_idのバリデーション' do
    it '空の場合は無効' do
      subject.soul_id = ''
      expect(subject).to be_invalid
    end
  end
 end
end
