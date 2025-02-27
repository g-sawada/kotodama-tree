class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :soul

  with_options presence: true do
    validates :user_id, uniqueness: { scope: :soul_id }
    validates :soul_id
  end
end
