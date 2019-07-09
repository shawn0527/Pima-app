class StockSerializer < ActiveModel::Serializer
  attributes :id, :symbol, :market_price, :amount_of_shares, :purchase_price, :user_id
end
