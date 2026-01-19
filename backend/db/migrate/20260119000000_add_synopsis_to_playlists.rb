class AddSynopsisToPlaylists < ActiveRecord::Migration[7.1]
  def change
    add_column :playlists, :synopsis, :text
  end
end
