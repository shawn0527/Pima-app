class CreateCosts < ActiveRecord::Migration[5.2]
  def change
    create_table :costs do |t|
      t.string :item_name
      t.integer :cost
      t.text :description
      t.integer :real_estate_id

      t.timestamps
    end
  end
end
