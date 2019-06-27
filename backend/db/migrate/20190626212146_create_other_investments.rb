class CreateOtherInvestments < ActiveRecord::Migration[5.2]
  def change
    create_table :other_investments do |t|
      t.string :name
      t.integer :amount
      t.integer :term
      t.string :ownership
      t.string :type
      t.integer :fixed_IRR
      t.integer :fiexed_return
      t.integer :projected_return
      t.integer :projected_IRR
      t.string :cost_item_name
      t.text :description
      t.integer :cost
      t.integer :user_id

      t.timestamps
    end
  end
end
