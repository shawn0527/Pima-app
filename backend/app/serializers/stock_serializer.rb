class StockSerializer < ActiveModel::Serializer
  attributes :id, :symbol, :amount_of_shares, :purchase_price, :user_id
end
