class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :mailing
end
