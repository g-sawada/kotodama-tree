require 'rails_helper'

RSpec.describe Favorite, type: :model do
  subject { build(:favorite) }

  let(:user) { create(:user) }
  let(:soul) { create(:soul) }

  before do
    subject.user = user
    subject.soul = soul
  end

  describe 'データベース制約' do
    context '正常に保存、削除できること' do
      it '正常にバリデーションを通過し、保存、削除できること' do
        expect(subject.save).to be_truthy
        subject.destroy
        expect{ subject.reload }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context 'user_idに関する制約' do
      it 'nilの場合は保存できないこと' do
        subject.user_id = nil
        expect{ subject.save(validate: false) }.to raise_error(ActiveRecord::NotNullViolation)
        expect(Favorite.exists?(subject.id)).to be_falsey
      end
    end

    context 'soul_idに関する制約' do
      it 'nilの場合は保存できないこと' do
        subject.soul_id = nil
        expect{ subject.save(validate: false) }.to raise_error(ActiveRecord::NotNullViolation)
        expect(Favorite.exists?(subject.id)).to be_falsey
      end
    end

    context '一意制約' do
      it 'user_id, soul_idの組み合わせが一意であること' do
        subject.save(validate: false)
        duplicate_subject = build(:favorite, user_id: subject.user_id, soul_id: subject.soul_id)
        expect{ duplicate_subject.save(validate: false)}.to raise_error(ActiveRecord::RecordNotUnique)
      end
    end
  end
end
