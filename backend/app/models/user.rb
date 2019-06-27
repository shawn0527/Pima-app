class User < ApplicationRecord
    has_many :stocks
    has_many :real_estates
    has_many :other_investments
end
