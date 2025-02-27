FactoryBot.define do
  factory :favorite do
    association :user
    association :soul
  end
end
