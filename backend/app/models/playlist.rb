class Playlist < ApplicationRecord
  belongs_to :dj
  has_many :songs, dependent: :delete_all
end
