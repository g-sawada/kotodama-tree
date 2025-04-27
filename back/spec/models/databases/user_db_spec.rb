require 'rails_helper'

RSpec.describe User, type: :model do
  subject { build(:user) }

  describe 'データベース制約' do
    context 'バリデーションを通過しdbに正常に保存できること' do
      it '必須項目が入っている場合は保存、削除できること' do
        expect(subject.save(validate: false)).to be_truthy
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

    context 'max_create_soulsに関する制約' do
      it 'nilの場合に保存できないこと' do
        subject.max_create_souls = nil
        expect{ subject.save(validate: false) }.to raise_error(ActiveRecord::NotNullViolation)
        expect(User.exists?(subject.id)).to be_falsey
      end
    end

    context 'max_carry_soulsに関する制約' do
      it 'nilの場合に保存できないこと' do
        subject.max_carry_souls = nil
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
        user = User.create(name: 'Test User', provider: 'google', provider_id: 'test123', level: 1, exp: 0, max_create_souls: 3, max_carry_souls: 3)
        subject.provider_id = 'test123'
        expect{ subject.save(validate: false) }.to raise_error(ActiveRecord::RecordNotUnique)
        expect(User.exists?(subject.id)).to be_falsey
      end
    end

    context 'system_userに関する制約(enumを有効化したとき)' do
      it 'system_userが1(:system)の場合、登録されて"system"が返ってくること' do
        subject.system_user = 1
        subject.save(validate: false)
        expect(subject.system_user).to eq("system")
      end

      it 'system_userが0(:general)の場合、登録されて"general"が返ってくること' do
        subject.system_user = 0
        subject.save(validate: false)
        expect(subject.system_user).to eq("general")
      end

      it 'enumが定義されている場合、範囲外の値(0, 1以外)が格納されるときエラーになる' do
        expect { subject.system_user = 3 }.to raise_error(ArgumentError)
      end

      it 'enumが定義されている場合、nilのとき保存できないこと' do
        subject.system_user = nil
        expect{ subject.save(validate: false) }.to raise_error(ActiveRecord::NotNullViolation)
      end
    end
=begin
    context 'system_userに関する制約(enumを無効化したとき)' do
      it 'system_userが1(:system)の場合、想定通りに１が登録されること ' do
        subject.system_user = 1
        subject.save(validate: false)
        expect(subject.system_user).to eq(1)
      end

      it 'system_userが0(:general)の場合、想定通りに０が登録されること ' do
        subject.system_user = 0
        subject.save(validate: false)
        expect(subject.system_user).to eq(0)
      end

      it 'system_userに何も指定していない場合0が自動的に保存されること' do
        user = User.create(name: "テストユーザー", max_create_souls: 4, max_carry_souls: 4, provider: "google", provider_id: 2222 )
        expect(user.system_user).to eq(0)
      end

      it '範囲外の値（0, 1以外）が保存できないこと' do
        subject.system_user = 4
        expect{ subject.save!(validate: false) }.to raise_error(ActiveRecord::StatementInvalid)
      end

      it 'nilの場合、保存できないこと' do
        subject.system_user = nil
        expect{ subject.save(validate: false) }.to raise_error(ActiveRecord::NotNullViolation)
      end
    end
=end
  end
end
