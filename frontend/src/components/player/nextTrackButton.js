// @flow
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faStepForward } from "@fortawesome/free-solid-svg-icons"

const NextTrackButton = (props) => {
  return (
    <a
      className={`playerButton ${props.disabled ? "disabled" : "enabled"}`}
      onClick={props.onClick}
    >
      <FontAwesomeIcon icon={faStepForward} />
    </a>
  )
}

export default NextTrackButton
