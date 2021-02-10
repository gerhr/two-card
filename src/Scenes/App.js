import React from "react"
import Table from "Components/Table"
import { Game,
  GameControls,
  Hands } from "Containers/Poker"


// If it were router it was placed here
export default () => (
  <div className="App">
    <Game
      numberOfPlayers={4}
    >
      <Table
        controls={
          <GameControls />
        }
      >
        <Hands />
      </Table>
    </Game>
  </div>
)
