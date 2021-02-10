import React, {
  useContext,
  useCallback,
  useMemo } from "react"
import { PokerGame } from "./context"
import _switch from "switch-function"
import Button from "Components/Button"
import { STATES } from "./StateMachine"


export default _ => {
  const {
    gameState,
    onTick,
    onBreak
  } = useContext(PokerGame)

  const invokeHelperText = useCallback(state => 
    _switch(state,{
      [STATES.IDLE]: "Start Game",
      [STATES.FLOP]: "Show Hands",
      [STATES.RIVER]: "Deal",
      [STATES.DEAL]: "New Game",
      default: "Start Game"
    })
  , [])

  const helperText = useMemo(_ =>
    invokeHelperText(gameState)
  , [invokeHelperText, gameState])

  return (
    <>
      <Button onClick={onTick}>
        { helperText }
      </Button>

      { gameState === STATES.DEAL &&
        <Button onClick={onBreak}>
          Finish Game
        </Button>
      }
    </>
  )
}
