FactoryBot.define do
  factory :pathway do
    figure_type { 1 }
    color { "blue" }
    association :room_1, factory: :room
    association :room_2, factory: :room
  end
end
