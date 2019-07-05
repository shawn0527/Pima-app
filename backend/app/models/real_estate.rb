class RealEstate < ApplicationRecord
    belongs_to :user
    has_many :costs
end
