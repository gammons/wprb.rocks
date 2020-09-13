// @flow
import React, { useState } from "react"

const ProgressBar = (props) => {
  let bar

  const onClick = (ev) => {
    let left = bar.offsetLeft
    const x = ev.pageX - left
    props.onClick(x / bar.offsetWidth)
  }

  return (
    <div className="progressBarHolder" onClick={onClick} ref={(r) => (bar = r)}>
      <div
        className="progressBar"
        style={{
          width: `${(props.percentage || 0) * 100}%`,
          transition: "all 0.5s linear",
        }}
      />
    </div>
  )
}

export default ProgressBar
