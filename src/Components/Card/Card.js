import React, {
    useMemo } from "react"
import "./styles.css"
import clsx from 'clsx'


export default ({
  rank,
  suit,
  reverse,
  outline
}) => {

  const suitName = useMemo(_ => {
    switch (suit) {
      case "\u2660":
        return "spade";
      case "\u2665":
        return "heart";
      case "\u2666":
        return "diamond";
      case "\u2663":
        return "club";
      default:
        return null;
    }
  }, [suit])

  return (
    <>
      <div
        className="card-frame"
        style={{
          boxShadow: outline ? `0px 0px 0px 6px ${outline}` : "none",
          backgroundColor: outline
        }}
      >
        { reverse ?
          <div className={clsx(["card", "reverse"])}></div>
          :
          <img
            src={`http://h3h.net/images/cards/${suitName}_${rank}.svg`}
            alt="example card"
            className="card"
          />
        }
      </div>
    </>
  )
}
