FactoryBot.define do
  factory :user do
    name { Faker::Name.name[0...10] }
    level { 1 }
    exp { 0 }
    max_create_souls { 3 }
    max_carry_souls { 3 }
    provider { "google" }
    provider_id { Faker::Alphanumeric.alphanumeric(number: 10) }
    system_user { 0 }
  end
end
