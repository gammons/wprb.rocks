class CreateSongs < ActiveRecord::Migration[6.0]
  def change
    create_table :songs do |t|
      t.integer :dj_id
      t.integer :playlist_id

      t.string :album_name
      t.string :name
      t.string :artist_name
      t.string :image_url

      t.string :spotify_album_id, null: false
      t.string :spotify_artist_id, null: false
      t.string :spotify_song_id, null: false

      t.index :dj_id
      t.index :playlist_id
      t.timestamps
    end
  end
end
