require 'rails_helper'

RSpec.describe User, type: :model do
  subject { build(:user) }

  describe 'データベース制約' do
    context 'バリデーションを通過しdbに正常に保存できること' do
      it '必須項目が入っている場合は保存、削除できること' do
        expect(subject.save).to be_truthy
        subject.destroy
        expect{ subject.reload }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context 'nameに関する制約' do
      it 'nilの場合に保存できないこと' do
        subject.name = nil
        expect{ subject.save(validate: false) }.to raise_error(ActiveRecord::NotNullViolation)
        expect(User.exists?(subject.id)).to be_falsey
      end
    end

    context 'levelに関する制約' do
      it 'nilの場合に保存できないこと' do
        subject.level = nil
        expect{ subject.save(validate: false) }.to raise_error(ActiveRecord::NotNullViolation)
        expect(User.exists?(subject.id)).to be_falsey
      end

      it 'デフォルト値が1であること' do
         subject.save(validate: false)
         expect(subject.level).to eq(1)
      end
    end

    context 'expに関する制約' do
      it 'nilの場合に保存できないこと' do
        subject.exp = nil
        expect{ subject.save(validate: false) }.to raise_error(ActiveRecord::NotNullViolation)
        expect(User.exists?(subject.id)).to be_falsey
      end

      it 'デフォルト値が0であること' do
        subject.save(validate: false)
        expect(subject.exp).to eq(0)
      end
    end

    context 'max_createに関する制約' do
      it 'nilの場合に保存できないこと' do
        subject.max_create = nil
        expect{ subject.save(validate: false) }.to raise_error(ActiveRecord::NotNullViolation)
        expect(User.exists?(subject.id)).to be_falsey
      end
    end

    context 'max_soulに関する制約' do
      it 'nilの場合に保存できないこと' do
        subject.max_soul = nil
        expect{ subject.save(validate: false) }.to raise_error(ActiveRecord::NotNullViolation)
        expect(User.exists?(subject.id)).to be_falsey
      end
    end

    context 'providerに関する制約' do
      it 'nilの場合に保存できないこと' do
        subject.provider = nil
        expect{ subject.save(validate: false) }.to raise_error(ActiveRecord::NotNullViolation)
        expect(User.exists?(subject.id)).to be_falsey
      end 
    end

    context 'provider_idに関する制約' do
      it 'nilの場合に保存できないこと' do
        subject.provider_id = nil
        expect{ subject.save(validate: false) }.to raise_error(ActiveRecord::NotNullViolation)
        expect(User.exists?(subject.id)).to be_falsey
      end

      it '他ユーザーとprovider, provider_idが重複しないこと' do
        user = User.create(name: 'Test User', provider: 'google', provider_id: 'test123', level: 1, exp: 0, max_create: 3, max_soul: 3)
        subject.provider_id = 'test123'
        expect{ subject.save(validate: false) }.to raise_error(ActiveRecord::RecordNotUnique)
        expect(User.exists?(subject.id)).to be_falsey
      end
    end
  end
end
