require 'rails_helper'

RSpec.describe Tree, type: :model do
  subject { build(:tree) }

  let(:room) { create(:room) }

  before do
    subject.user = room.user
    subject.room = room
  end

  describe 'データベース制約' do
    context 'バリデーションを通過しdbに正常に保存できること' do
      it '必須項目が入っている場合は保存、削除ができること' do
        expect(subject.save).to be_truthy
        subject.destroy
        expect { subject.reload }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context '正常に削除されること' do
      it 'userを削除した場合にtreeも削除されること' do
        subject.save(validate: false)
        subject.user.destroy
        expect { subject.reload }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context 'levelに関する制約' do
      it 'nilの場合に保存できないこと' do
        subject.level = nil
        expect{ subject.save(validate: false) }.to raise_error(ActiveRecord::NotNullViolation)
        expect(Tree.exists?(subject.id)).to be_falsey
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
        expect(Tree.exists?(subject.id)).to be_falsey
      end

      it 'デフォルト値が0であること' do
        subject.save(validate: false)
        expect(subject.exp).to eq(0)
      end
    end

    context 'imageに関する制約' do
      it 'nilの場合に保存できないこと' do
        subject.image = nil
        expect{ subject.save(validate: false) }.to raise_error(ActiveRecord::NotNullViolation)
        expect(Tree.exists?(subject.id)).to be_falsey
      end
    end

    context 'user_idに関する制約' do
      it 'nilの場合に保存できないこと' do
        subject.user_id = nil
        expect{ subject.save(validate: false) }.to raise_error(ActiveRecord::NotNullViolation)
        expect(Tree.exists?(subject.id)).to be_falsey
      end
    end

    context 'room_idに関する制約' do
      it 'nilの場合に保存できないこと' do
        subject.room_id = nil
        expect{ subject.save(validate: false) }.to raise_error(ActiveRecord::NotNullViolation)
        expect(Tree.exists?(subject.id)).to be_falsey
      end
    end
  end
end
