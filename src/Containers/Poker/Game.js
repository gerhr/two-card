import React, {
  useCallback,
  useState,
  useMemo } from "react"
import { useStateMachine } from "use-state-machine"
import { GameService } from "Services"
import { PokerGame } from "./context"
import StateMachine, {
  STATES } from "./StateMachine"


export default ({
  numberOfPlayers,
  children
}) => {
  const [, transition] = useStateMachine(StateMachine)

  const [state, setState] = useState({
    gameState: StateMachine.state,
    value: {
      hands: null,
      winner: null
    }
  })

  const Game = useMemo(_ =>
    new GameService(numberOfPlayers)
  ,[numberOfPlayers])

  // Crutch to update state
  // fixes dependencies in react-dom
  // BTW This works like middleware
  StateMachine.onTransition(machine => {
    setState({
      gameState: machine.state,
      value: {
        ...state.value,
        ...machine._states[machine.state].value,
      }
    })
  })

  // This is simulation of action creators
  const handleNextTick = useCallback(_ => {
    switch (state.gameState) {
      case STATES.FLOP:
        transition.showRiver()
        break;
      case STATES.RIVER:
        transition.showWinner({
          winners: Game.winners(state.value.hands)
        })
        break;
      default:
        Game.start()

        transition.startGame({
          hands: Game.createHands()
        });
    }
  }, [state, Game, transition])

  const handleBreak = useCallback(_ => {
    transition.finishGame({
      hands: [],
      winners: []
    })
  }, [transition])


  return (
    <PokerGame.Provider
      value={{
        gameState: state.gameState,
        hands: state.value.hands,
        onTick: handleNextTick,
        onBreak: handleBreak,
        winners: state.value.winners,
        Game
      }}
    >
      { children }
    </PokerGame.Provider>
  )
}
