class RealEstate < ApplicationRecord
    belongs_to :user
    has_many :costs

    def total_extra_cost
        self.costs.map{|cost|cost.cost}.sum
    end
end
