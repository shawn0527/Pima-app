class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :symbol
      t.decimal :market_price
      t.integer :amount_of_shares
      t.string :company_name
      t.decimal :purchase_price
      t.string :cost_item_name
      t.text :description
      t.decimal :cost
      t.integer :user_id

      t.timestamps
    end
  end
end
