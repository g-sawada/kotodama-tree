require 'rails_helper'

RSpec.describe ResetSchedule, type: :model do
  let(:reset_schedule) { create(:reset_schedule) }

  describe 'データベース制約' do
    context 'バリデーションを通過しdbに正常に保存できること' do
      it '保存、削除できること。指定のない場合，statusの初期値が not_started: 0 であること' do
        expect(subject.status).to eq('not_started')     # モデルインスタンスの初期値を確認
        expect(subject.save).to be_truthy
        expect(subject.reload.status).to eq('not_started') # DBの値を確認
        subject.destroy
        expect{ subject.reload }.to raise_error(ActiveRecord::RecordNotFound)
      end

      it 'statusを指定した場合，指定した値で保存されること' do
        subject.status = 'preparing'
        expect(subject.save).to be_truthy
        expect(subject.reload.status).to eq('preparing') # DBの値を確認
      end
    end

    context 'statusに関する制約' do
      it 'nilの場合に保存できないこと' do
        subject.status = nil
        expect{ subject.save(validate: false) }.to raise_error(ActiveRecord::NotNullViolation)
        expect(ResetSchedule.exists?(subject.id)).to be_falsey
      end
    end
  end
end