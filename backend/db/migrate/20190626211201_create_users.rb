class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :email
      t.string :firstname
      t.string :middlename
      t.string :lastname
      t.string :mailing

      t.timestamps
    end
  end
end
