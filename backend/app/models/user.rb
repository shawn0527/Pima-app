class User < ApplicationRecord
    has_secure_password
    has_many :stocks
    has_many :real_estates
    has_many :other_investments
    validates :username, uniqueness: true

    def total_stocks_value
        self.stocks.map{|stock|stock.cost}.sum.to_f
    end

    def total_realestates_value
        self.real_estates.map{|real_estate|real_estate.cost}.sum.to_f
    end
end
