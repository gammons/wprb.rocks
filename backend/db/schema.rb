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

ActiveRecord::Schema.define(version: 2020_09_05_093033) do

  create_table "djs", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "playlists", force: :cascade do |t|
    t.integer "dj_id"
    t.integer "spinitron_id"
    t.string "name"
    t.string "timeslot"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["dj_id"], name: "index_playlists_on_dj_id"
    t.index ["spinitron_id"], name: "index_playlists_on_spinitron_id"
  end

  create_table "songs", force: :cascade do |t|
    t.integer "dj_id"
    t.integer "playlist_id"
    t.string "album_name"
    t.string "name"
    t.string "artist_name"
    t.string "image_url"
    t.string "spotify_album_id", null: false
    t.string "spotify_artist_id", null: false
    t.string "spotify_song_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["dj_id"], name: "index_songs_on_dj_id"
    t.index ["playlist_id"], name: "index_songs_on_playlist_id"
  end

end
