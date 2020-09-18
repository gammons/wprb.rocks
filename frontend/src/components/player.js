// @flow
import React, { useState, useRef } from "react"
import { debounce } from "debounce"

import SpotifyPlayer from "../models/spotifyPlayer"
import PlayButton from "./player/playButton"
import ProgressBar from "./player/progressBar"
import NextTrackButton from "./player/nextTrackButton"
import PrevTrackButton from "./player/prevTrackButton"
import ArtistAndTrack from "./player/artistAndTrack"
import VolumeSlider from "./player/volumeSlider"

import PlaylistContext from "./playlistContext"

import Footer from "./footer"

import "./player/css/player.css"

type Props = {
  accessTokenFn: () => void,
}

const Player = (props: Props) => {
  const { playlist, songIndex, setSongIndex } = React.useContext(
    PlaylistContext
  )

  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [spotifyPlayer, setSpotifyPlayer] = useState(null)
  const timer = useRef(null)

  const [position, setPosition] = useState(0)
  const positionRef = useRef(position)
  positionRef.current = position

  const [hasNextTrack, setHasNextTrack] = useState(false)
  const [artist, setArtist] = useState("")
  const [artistId, setArtistId] = useState("")
  const [album, setAlbum] = useState("")
  const [trackTitle, setTrackTitle] = useState("")
  const [trackDuration, setTrackDuration] = useState(0)
  const [albumImageURL, setAlbumImageURL] = useState("")
  const [volume, setVolume] = useState(0.7)
  const volumeRef = useRef(null)

  const setupPlayer = () => {
    const aPlayer = new window.Spotify.Player({
      name: "WPRB.rocks Player",
      volume,
      getOauthToken: props.accessTokenFn,
    })

    aPlayer.addListener("initialization_error", console.error)
    aPlayer.addListener("authentication_error", console.error)
    aPlayer.addListener("account_error", console.error)
    aPlayer.addListener("playback_error", console.error)

    aPlayer.addListener("player_state_changed", (state) => {
      setArtistId(state.track_window.current_track.artists[0].uri.split(":")[2])
      setArtist(state.track_window.current_track.artists[0].name)
      setAlbum(state.track_window.current_track.album.name)
      setTrackTitle(state.track_window.current_track.name)
      setTrackDuration(state.track_window.current_track.duration_ms)
      setAlbumImageURL(state.track_window.current_track.album.images[2].url)
      setHasNextTrack(state.track_window.next_tracks.length > 0)
      setPosition(state.position)

      setIsPlaying(!state.paused)

      if (state.paused) {
        clearTimeout(timer.current)
        timer.current = null
      } else if (!timer.current) {
        progressTick()
      }
    })

    aPlayer.addListener("ready", (ret) => {
      const player = new SpotifyPlayer(ret.device_id, props.accessTokenFn)
      setSpotifyPlayer(player)
      volumeRef.current = debounce((val) => {
        aPlayer.setVolume(val)
      }, 500)
    })

    aPlayer.connect()
  }

  React.useEffect(() => {
    const readyLoop = () => {
      if (window.Spotify) {
        setupPlayer()
        setIsReady(true)
      } else {
        setTimeout(readyLoop, 1000)
      }
    }
    readyLoop()
  }, [])

  React.useEffect(() => {
    if (!isPlaying) {
      clearTimeout(timer.current)
      timer.current = null
    }
  }, [timer.current])

  React.useEffect(() => {
    if (playlist.length > 0 && isReady) {
      onStartPlay()
    }
  }, [playlist.length, songIndex])

  const onStartPlay = () => {
    clearTimeout(timer.current)
    spotifyPlayer.play(playlist, songIndex, 0).then(() => {
      progressTick()
      setIsPlaying(true)
      setPosition(0)
    })
  }

  const onTogglePlay = () => {
    if (!isPlaying) {
      spotifyPlayer.play(playlist, songIndex, position).then(() => {
        setIsPlaying(!isPlaying)
        progressTick()
      })
    } else {
      spotifyPlayer.pause().then(() => {
        setIsPlaying(!isPlaying)
        clearTimeout(timer.current)
        timer.current = null
      })
    }
  }

  const onRequestNextTrack = () => {
    if (!hasNextTrack) return
    if (isPlaying) {
      spotifyPlayer.play(playlist, songIndex + 1, 0)
    }
    setPosition(0)
    setSongIndex(songIndex + 1)
  }

  const onRequestPrevTrack = () => {
    const trackToPlay = songIndex === 0 ? 0 : songIndex - 1

    if (isPlaying) {
      spotifyPlayer.play(playlist, trackToPlay, 0)
    }
    setPosition(0)
    setSongIndex(trackToPlay)
  }

  const onSetVolume = (ev) => {
    volumeRef.current(ev.target.value)
    setVolume(ev.target.value)
  }

  const progressTick = () => {
    setPosition(positionRef.current + 1000)
    timer.current = setTimeout(progressTick, 1000)
  }

  const progressClick = (percentage) => {
    const newPosition = trackDuration * percentage
    setPosition(newPosition)
    if (isPlaying) {
      spotifyPlayer.play(playlist, songIndex, newPosition)
    }
  }

  return (
    <div className="player-outer">
      <div>
        <div className="player">
          {/* track cover and artist name, on left */}
          <div className="trackInfo">
            <div
              className="albumCover"
              style={{ backgroundImage: `url(${albumImageURL})` }}
            />
            <ArtistAndTrack
              artistId={artistId}
              artist={artist}
              trackTitle={trackTitle}
              album={album}
            />
          </div>

          {/* controls in middle */}
          <div className="controls">
            <div className="control-buttons">
              <PrevTrackButton
                disabled={playlist.length === 0}
                onClick={onRequestPrevTrack}
              />
              <PlayButton
                disabled={playlist.length === 0}
                isPlaying={isPlaying}
                onClick={onTogglePlay}
              />
              <NextTrackButton
                disabled={playlist.length === 0 || !hasNextTrack}
                onClick={onRequestNextTrack}
              />
            </div>
            <ProgressBar
              percentage={position / trackDuration}
              onClick={progressClick}
            />
          </div>

          {/* volume slider, always at end*/}
          <div className="volume-slider">
            <VolumeSlider onSetVolume={onSetVolume} volume={volume} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Player
