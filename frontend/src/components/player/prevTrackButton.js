// @flow
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faStepBackward } from "@fortawesome/free-solid-svg-icons"

const PrevTrackButton = (props) => {
  return (
    <a
      className={`playerButton ${props.disabled ? "disabled" : "enabled"}`}
      onClick={props.onClick}
    >
      <FontAwesomeIcon icon={faStepBackward} />
    </a>
  )
}

export default PrevTrackButton
