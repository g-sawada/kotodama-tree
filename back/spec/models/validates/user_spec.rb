require 'rails_helper'

RSpec.describe User, type: :model do
  subject { build(:user) }

  describe 'バリデーション' do
    context 'name に関するバリデーション' do
      it '空の場合は無効' do
        subject.name = ''
        expect(subject).to be_invalid 
      end

      it '21文字以上の場合は無効' do
        subject.name = 'a' * 21
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

    context 'max_createに関するバリデーション' do
      it '空の場合は無効' do
        subject.max_create = ''
        expect(subject).to be_invalid
      end
    end

    context 'max_soulに関するバリデーション' do
      it '空の場合は無効' do
        subject.max_soul = ''
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
  end
end
