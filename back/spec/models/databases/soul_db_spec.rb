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

  describe 'データベース制約' do
    context 'バリデーションを通過しdbに正常に保存できること' do
      it '必須項目が入っている場合は保存、削除ができること' do
        expect(subject.save).to be_truthy
        subject.destroy
        expect { subject.reload }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context '正常に削除できること' do
      it 'userが削除されるとsoulも削除されること' do
        subject.save
        creator.destroy
        expect(Soul.exists?(subject.id)).to be_falsey
      end
    end

    context 'contentに関する制約' do
      it 'nilの場合に保存できないこと' do
        subject.content = nil
        expect{ subject.save(validate: false) }.to raise_error(ActiveRecord::NotNullViolation)
        expect(Soul.exists?(subject.id)).to be_falsey
      end
    end

    context 'harvested_countに関する制約' do
      it 'nilの場合に保存できないこと' do
        subject.harvested_count = nil
        expect{ subject.save(validate: false) }.to raise_error(ActiveRecord::NotNullViolation)
        expect(User.exists?(subject.id)).to be_falsey
      end

      it 'デフォルト値が0であること' do
        subject.save
        expect(subject.harvested_count).to eq(0)
      end
    end

    context 'creator_idに関する制約' do
      it 'nilの場合に保存できないこと' do
        subject.creator_id = nil
        expect{ subject.save(validate: false) }.to raise_error(ActiveRecord::NotNullViolation)
        expect(Soul.exists?(subject.id)).to be_falsey
      end
    end

    context 'owner_idに関する制約' do
      it 'nilの場合でも保存できること' do
        subject.owner_id = nil
        expect(subject.save(validate: false)).to be_truthy
      end

      it 'owner_idのuserが削除されたときnilになること' do
        user = FactoryBot.create(:user)
        subject.owner_id = user
        subject.save(validate: false)

        user.destroy
        subject.reload
        expect(subject.owner_id).to eq(nil)
      end

      it 'owner_idに他ユーザーのidが正常に入ること' do
        other_user = create(:user)
        subject.owner_id = other_user.id
        expect(subject.save(validate: false)).to be_truthy
      end
    end

    context 'home_tree_idに関する制約' do
      it 'nilの場合でも保存できること' do
        subject.home_tree_id = nil
        expect(subject.save(validate: false)).to be_truthy
      end

      it 'home_tree_idのtreeが削除されたときnilになること' do
        tree = FactoryBot.create(:tree)
        subject.home_tree_id = tree
        subject.save(validate: false)

        tree.destroy
        subject.reload
        expect(subject.home_tree_id).to eq(nil)
      end
    end

    context 'captured_tree_idに関する制約' do
      it 'nilの場合でも保存できること' do
        subject.captured_tree_id = nil
        expect(subject.save(validate: false)).to be_truthy
      end

      it 'captured_tree_idのtreeが削除されたときnilになること' do
        tree = FactoryBot.create(:tree)
        subject.captured_tree_id = tree
        subject.save(validate: false)

        tree.destroy
        subject.reload
        expect(subject.captured_tree_id).to eq(nil)
      end

      it 'captured_tree_idに他ユーザーのidが正常に入ること' do
        other_tree = create(:tree)
        subject.captured_tree_id = other_tree.id
        expect(subject.save(validate: false)).to be_truthy
      end
    end
  end
end
