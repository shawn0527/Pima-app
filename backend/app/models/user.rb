class User < ApplicationRecord
    has_secure_password
    has_many :stocks
    has_many :real_estates
    has_many :other_investments
    validates :username, uniqueness: true
end
