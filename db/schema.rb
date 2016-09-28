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

ActiveRecord::Schema.define(version: 20160927194752) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "chats", force: :cascade do |t|
    t.integer  "pair_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "messages", force: :cascade do |t|
    t.integer  "chat_id",    null: false
    t.integer  "user_id",    null: false
    t.text     "content",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pairs", force: :cascade do |t|
    t.integer  "sender_id",   null: false
    t.integer  "receiver_id"
    t.boolean  "accepted"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "preferences", force: :cascade do |t|
    t.string   "looking_for", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "user_preferences", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "preference_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "name",               null: false
    t.string   "provider",           null: false
    t.string   "uid",                null: false
    t.string   "token",              null: false
    t.string   "refresh_token",      null: false
    t.integer  "age"
    t.string   "gender"
    t.text     "about"
    t.integer  "min_age_choice"
    t.integer  "max_age_choice"
    t.string   "birdlist_id"
    t.string   "anthem_id"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: falset 
  end

end
