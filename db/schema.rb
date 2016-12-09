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

ActiveRecord::Schema.define(version: 20161207062839) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "cube"
  enable_extension "earthdistance"

  create_table "routes", force: :cascade do |t|
    t.string "route_name"
  end

  create_table "routes_stops", id: false, force: :cascade do |t|
    t.integer "stop_id",  null: false
    t.integer "route_id", null: false
    t.index ["route_id"], name: "index_routes_stops_on_route_id", using: :btree
    t.index ["stop_id"], name: "index_routes_stops_on_stop_id", using: :btree
  end

  create_table "stops", force: :cascade do |t|
    t.float   "boardings"
    t.float   "alightings"
    t.date    "month_beginning"
    t.decimal "latitude"
    t.decimal "longitude"
    t.integer "street_id"
    t.string  "cross_street"
    t.index ["latitude"], name: "index_stops_on_latitude", using: :btree
    t.index ["longitude"], name: "index_stops_on_longitude", using: :btree
  end

  create_table "streets", force: :cascade do |t|
    t.string "street_name"
  end

  add_foreign_key "stops", "streets"
end
