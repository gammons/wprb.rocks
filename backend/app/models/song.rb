class Song < ApplicationRecord
  belongs_to :dj
  belongs_to :playlist
end
