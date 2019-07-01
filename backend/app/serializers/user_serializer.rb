class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :firstname, :middlename, :lastname, :email, :mailing
end
