class CreateRealEstates < ActiveRecord::Migration[5.2]
  def change
    create_table :real_estates do |t|
      t.string :name
      t.string :address
      t.integer :rent
      t.integer :insurance
      t.integer :tax
      t.string :cost_item_name
      t.text :description
      t.integer :cost
      t.integer :user_id

      t.timestamps
    end
  end
end
