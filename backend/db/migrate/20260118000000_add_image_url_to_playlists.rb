class AddImageUrlToPlaylists < ActiveRecord::Migration[7.1]
  def change
    add_column :playlists, :image_url, :string
  end
end
