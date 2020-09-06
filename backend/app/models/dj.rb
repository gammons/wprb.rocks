class Dj < ApplicationRecord
  has_many :songs, dependent: :delete_all
  has_many :playlists, dependent: :delete_all
end
