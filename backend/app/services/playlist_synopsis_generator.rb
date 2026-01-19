class PlaylistSynopsisGenerator
  def initialize
    @client = Anthropic::Client.new
  end

  def generate(playlist)
    return nil if playlist.songs.empty?

    prompt = build_prompt(playlist)

    response = @client.messages.create(
      model: 'claude-3-5-haiku-latest',
      max_tokens: 256,
      messages: [{ role: 'user', content: prompt }]
    )

    response.content.first.text
  rescue StandardError => e
    Rails.logger.error("Failed to generate synopsis for playlist #{playlist.id}: #{e.message}")
    nil
  end

  private

  def build_prompt(playlist)
    songs_list = playlist.songs.map do |song|
      "- \"#{song.name}\" by #{song.artist_name} (#{song.album_name})"
    end.join("\n")

    <<~PROMPT
      Given this playlist of songs from a college radio station, identify the primary genre and provide a brief description.

      Respond in exactly this format (no other text):
      Genre: [primary genre]
      [a few descriptive phrases separated by commas, not a full sentence - describe the vibe, style, and mood]

      Example response:
      Genre: Indie Rock
      dreamy atmospheres, lo-fi production, introspective lyrics, warm analog textures

      Playlist: "#{playlist.name}" by DJ #{playlist.dj.name}

      Songs:
      #{songs_list}
    PROMPT
  end
end
