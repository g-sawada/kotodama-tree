require 'rails_helper'

RSpec.describe User, type: :model do
  subject { build(:user) }

  describe 'バリデーション' do
    context 'name に関するバリデーション' do
      it '空の場合は無効' do
        subject.name = ''
        expect(subject).to be_invalid 
      end

      it '11文字以上の場合は無効' do
        subject.name = 'a' * 11
        expect(subject).to be_invalid
      end
    end

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

    context 'max_create_soulsに関するバリデーション' do
      it '空の場合は無効' do
        subject.max_create_souls = ''
        expect(subject).to be_invalid
      end
    end

    context 'max_carry_soulsに関するバリデーション' do
      it '空の場合は無効' do
        subject.max_carry_souls = ''
        expect(subject).to be_invalid
      end
    end

    context 'providerに関するバリデーション' do
      it '空の場合は無効' do
        subject.provider = ''
        expect(subject).to be_invalid
      end
    end

    context 'provider_idに関するバリデーション' do
      it '空の場合は無効' do
        subject.provider_id = ''
        expect(subject).to be_invalid
      end
    end

    context 'system_userに関するバリデーション' do
      it '空の場合は無効' do
        subject.system_user = ''
        expect(subject).to be_invalid
      end

      it 'system_user を指定しない場合は general が設定されること' do
        user = User.new(
          name: "テスト太郎",
          level: 1,
          exp: 0,
          max_create_souls: 3,
          max_carry_souls: 3,
          provider: "google",
          provider_id: "abc123"
        )
        expect(user.system_user).to eq("general")
      end
    
      it '範囲外の値(0, 1以外)の場合はArgumentErrorが発生し、generalになること' do
        expect { subject.system_user = 3 }.to raise_error(ArgumentError)
      end
    end
  end
end
