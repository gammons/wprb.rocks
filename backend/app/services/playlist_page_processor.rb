# takes a playlist url from Spinitron
# e.g. https://spinitron.com/WPRB/pl/11544430/The-Lights-Are-On-But-Everyone-s-Home
# and returns an array of als
class PlaylistPageProcessor
  def process(url)
    process_html(retrieve(url))
  end

  def retrieve(url)
    resp = HTTP.get(url)
    resp.body.to_s
  end

  def process_html(html)
    ret = []
    doc = Nokogiri::HTML(html)
    doc.search("tr.spin-item").each do |play|
      artist = play.css("span.artist")[0].text
      album = play.css("span.release")[0].text
      song = play.css("span.song")[0].text

      ret << { artist: artist, album: album, song: song }
    end

    ret
  end
end
