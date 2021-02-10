import React from "react"
import "./styles.css"


export default ({
  onClick,
  children
}) => (
  <button
    onClick={onClick}
    className="play-button"
  >
    { children }
  </button>
)
