# takes a playlist url from Spinitron
# e.g. https://spinitron.com/WPRB/pl/11544430/The-Lights-Are-On-But-Everyone-s-Home
# and returns a hash with :songs (array of Song models) and :image_url
class PlaylistPageProcessor
  def process(url)
    process_html(retrieve(url))
  end

  def retrieve(url)
    resp = HTTP.get(url)
    resp.body.to_s
  end

  def process_html(html)
    songs = []
    doc = Nokogiri::HTML(html)
    doc.search('tr.spin-item').each do |play|
      artist = play.css('span.artist')[0].text
      album = begin
        play.css('span.release')[0].text
      rescue StandardError
        nil
      end
      song = play.css('span.song')[0].text

      songs << Song.new(artist_name: artist, album_name: album, name: song)
    end

    # Extract show image from the page
    image_url = extract_show_image(doc)

    { songs: songs, image_url: image_url }
  end

  private

  def extract_show_image(doc)
    # Look for the show image - it's an img tag with src containing "img_show"
    img = doc.at_css('img[src*="img_show"]')
    return nil unless img

    src = img['src']
    # Ensure it's a full URL
    src.start_with?('http') ? src : "https://spinitron.com#{src}"
  rescue StandardError
    nil
  end
end
