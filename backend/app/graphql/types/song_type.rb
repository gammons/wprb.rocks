module Types
  class SongType < Types::BaseObject
    field :id, ID, null: false
    field :dj_id, Integer, null: true
    field :playlist_id, Integer, null: true
    field :album_name, String, null: true
    field :name, String, null: true
    field :artist_name, String, null: true
    field :image_url, String, null: true
    field :spotify_album_id, String, null: false
    field :spotify_artist_id, String, null: false
    field :spotify_song_id, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :album_name, String, null: true
    field :name, String, null: true
    field :artist_name, String, null: true
    field :image_url, String, null: true
    field :spotify_album_id, String, null: true
    field :spotify_artist_id, String, null: true
    field :spotify_song_id, String, null: true
  end
end
