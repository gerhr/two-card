import React from "react"
import "./styles.css"


export default ({
  children,
  controls
}) => (
  <div className="table">
    <div className="playspace">
      { children }
    </div>

    <div className="toolbar">
      { controls }
    </div>
  </div>
)
