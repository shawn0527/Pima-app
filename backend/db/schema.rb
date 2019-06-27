# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_06_26_212146) do

  create_table "other_investments", force: :cascade do |t|
    t.string "name"
    t.integer "amount"
    t.integer "term"
    t.string "ownership"
    t.string "type"
    t.integer "fixed_IRR"
    t.integer "fiexed_return"
    t.integer "projected_return"
    t.integer "projected_IRR"
    t.string "cost_item_name"
    t.text "description"
    t.integer "cost"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "real_estates", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.integer "rent"
    t.integer "insurance"
    t.integer "tax"
    t.string "cost_item_name"
    t.text "description"
    t.integer "cost"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stocks", force: :cascade do |t|
    t.string "symbol"
    t.integer "market_price"
    t.integer "amount_of_shares"
    t.string "company_name"
    t.integer "purchase_price"
    t.string "cost_item_name"
    t.text "description"
    t.integer "cost"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "email"
    t.string "firstname"
    t.string "lastname"
    t.string "mailing"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
