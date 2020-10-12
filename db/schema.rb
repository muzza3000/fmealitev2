# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_10_12_090014) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "actions", force: :cascade do |t|
    t.text "description"
    t.date "deadline"
    t.string "status"
    t.text "followup"
    t.bigint "user_id", null: false
    t.bigint "cause_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["cause_id"], name: "index_actions_on_cause_id"
    t.index ["user_id"], name: "index_actions_on_user_id"
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "activities", force: :cascade do |t|
    t.text "description"
    t.bigint "fmea_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["fmea_id"], name: "index_activities_on_fmea_id"
  end

  create_table "causes", force: :cascade do |t|
    t.text "description"
    t.integer "occurrence"
    t.bigint "failure_mode_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "active"
    t.index ["failure_mode_id"], name: "index_causes_on_failure_mode_id"
  end

  create_table "effects", force: :cascade do |t|
    t.text "description"
    t.integer "severity"
    t.bigint "failure_mode_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["failure_mode_id"], name: "index_effects_on_failure_mode_id"
  end

  create_table "failure_modes", force: :cascade do |t|
    t.text "description"
    t.bigint "function_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["function_id"], name: "index_failure_modes_on_function_id"
  end

  create_table "fmeas", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "fmea_type"
    t.bigint "risk_matrix_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["risk_matrix_id"], name: "index_fmeas_on_risk_matrix_id"
  end

  create_table "functions", force: :cascade do |t|
    t.text "description"
    t.bigint "fmea_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["fmea_id"], name: "index_functions_on_fmea_id"
  end

  create_table "risk_matrices", force: :cascade do |t|
    t.string "s1"
    t.string "s2"
    t.string "s3"
    t.string "s4"
    t.string "s5"
    t.string "s6"
    t.string "s7"
    t.string "s8"
    t.string "s9"
    t.string "s10"
    t.string "o1"
    t.string "o2"
    t.string "o3"
    t.string "o4"
    t.string "o5"
    t.string "o6"
    t.string "o7"
    t.string "o8"
    t.string "o9"
    t.string "o10"
    t.integer "scale"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "first_name"
    t.string "last_name"
    t.string "color"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "actions", "causes"
  add_foreign_key "actions", "users"
  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "activities", "fmeas"
  add_foreign_key "causes", "failure_modes"
  add_foreign_key "effects", "failure_modes"
  add_foreign_key "failure_modes", "functions"
  add_foreign_key "fmeas", "risk_matrices"
  add_foreign_key "functions", "fmeas"
end
