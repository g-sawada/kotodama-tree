FactoryBot.define do
  factory :tree do
    level { 1 }
    exp { 0 }
    last_charged_at { Faker::Time.backward(days: 1, period: :evening) }
    image { Faker::LoremFlickr.image(size: "300x300", search_terms: ['nature']) }
    association :user
    association :room
  end
end
