# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_02_27_055410) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "favorites", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "user_id", null: false
    t.bigint "soul_id", null: false
    t.index ["soul_id"], name: "index_favorites_on_soul_id"
    t.index ["user_id", "soul_id"], name: "index_favorites_on_user_id_and_soul_id", unique: true
    t.index ["user_id"], name: "index_favorites_on_user_id"
  end

  create_table "pathways", force: :cascade do |t|
    t.integer "figuretype"
    t.string "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "room_1_id", null: false
    t.uuid "room_2_id", null: false
    t.index ["room_1_id", "room_2_id"], name: "index_pathways_on_room_1_id_and_room_2_id", unique: true
    t.index ["room_1_id"], name: "index_pathways_on_room_1_id"
    t.index ["room_2_id"], name: "index_pathways_on_room_2_id"
  end

  create_table "rooms", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "user_id"
    t.index ["user_id"], name: "index_rooms_on_user_id", unique: true
  end

  create_table "souls", force: :cascade do |t|
    t.string "content", null: false
    t.integer "captured_count", default: 0, null: false
    t.integer "harvested_count", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "owner_id"
    t.uuid "creator_id", null: false
    t.bigint "home_tree_id"
    t.bigint "captured_tree_id"
    t.index ["captured_tree_id"], name: "index_souls_on_captured_tree_id"
    t.index ["creator_id"], name: "index_souls_on_creator_id"
    t.index ["home_tree_id"], name: "index_souls_on_home_tree_id"
    t.index ["owner_id"], name: "index_souls_on_owner_id"
  end

  create_table "trees", force: :cascade do |t|
    t.integer "level", default: 1, null: false
    t.integer "exp", default: 0, null: false
    t.datetime "last_charged_at"
    t.string "image", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "user_id", null: false
    t.uuid "room_id", null: false
    t.index ["room_id"], name: "index_trees_on_room_id", unique: true
    t.index ["user_id"], name: "index_trees_on_user_id", unique: true
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.integer "level", default: 1, null: false
    t.integer "exp", default: 0, null: false
    t.integer "max_create", null: false
    t.integer "max_soul", null: false
    t.string "provider", null: false
    t.string "provider_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["provider", "provider_id"], name: "index_users_on_provider_and_provider_id", unique: true
  end

  add_foreign_key "favorites", "souls"
  add_foreign_key "favorites", "users"
  add_foreign_key "pathways", "rooms", column: "room_1_id"
  add_foreign_key "pathways", "rooms", column: "room_2_id"
  add_foreign_key "rooms", "users", on_delete: :nullify
  add_foreign_key "souls", "trees", column: "captured_tree_id"
  add_foreign_key "souls", "trees", column: "home_tree_id"
  add_foreign_key "souls", "users", column: "creator_id"
  add_foreign_key "souls", "users", column: "owner_id"
  add_foreign_key "trees", "rooms"
  add_foreign_key "trees", "users"
end
