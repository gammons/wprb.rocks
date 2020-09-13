// @flow
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons"

const PlayButton = (props) => {
  const onClick = () => {
    if (props.disabled) return
    props.onClick()
  }

  return props.isPlaying ? (
    <a
      className={`playerButton ${props.disabled ? "disabled" : "enabled"}`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faPause} />
    </a>
  ) : (
    <a
      className={`playerButton ${props.disabled ? "disabled" : "enabled"}`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faPlay} />
    </a>
  )
}

export default PlayButton
