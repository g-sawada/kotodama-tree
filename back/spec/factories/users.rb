FactoryBot.define do
  factory :user do
    name { Faker::Name.name[0...20] }
    level { 1 }
    exp { 0 }
    max_create { 3 }
    max_soul { 3 }
    provider { "google" }
    provider_id { Faker::Alphanumeric.alphanumeric(number: 10) }
  end
end
