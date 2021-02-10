import React from "react"
import Card from "Components/Card"
import "./styles.css"


export default ({
  cards,
  visible = false,
  highlights = [],
  title
}) => (
  <>
    { title &&
      <h1 className="card-header">{ title }</h1>
    }
    <div className="hand">
      {cards.map(([rank, suit], i) => (
        <Card
            key={`card_${rank}${suit}`}
            outline={highlights[i]}
            rank={rank}
            suit={suit}
            reverse={!visible}
        />
      ))}
    </div>
  </>
)
