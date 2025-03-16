FactoryBot.define do
  factory :soul do
    content { Faker::Lorem.sentence }
    harvested_count { 0 }
    association :creator, factory: :user
    association :owner, factory: :user
    association :home_tree, factory: :tree 
    association :captured_tree, factory: :tree 
  end
end
