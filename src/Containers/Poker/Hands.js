import React, {
  useContext,
  useMemo } from "react"
import _last from "lodash/last"
import _dropRight from "lodash/dropRight"
import { STATES } from "./StateMachine"
import { PokerGame } from "./context"
import Hand from "Components/Hand"


const COLORS = Object.freeze([
  "#ffcdd2",
  "#f48fb1",
  "#ba68c8",
  "#7e57c2",
  "#3f51b5",
  "#1e88e5",
  "#0288d1",
  "#00838f",
  "#004d40",
  "#2e7d32"
])


export default _ => {
  const {
    gameState,
    hands,
    Game,
    winners
  } = useContext(PokerGame)

  const colorPicker = useMemo(_ => {
    let pickedColorsHead = 0

    return () => {
      ++pickedColorsHead

      return COLORS[pickedColorsHead]
    }
  },[hands]) // eslint-disable-line react-hooks/exhaustive-deps

  const highlights = useMemo(_ =>
    hands ?
      hands.map(cardStack => {
        const pairs = Game.solve(cardStack)

        const Colors = pairs.reduce((result, rank) => ({
          ...result,
          [rank]: colorPicker()
        }), {})

        const result = cardStack.map(card =>
          Colors[card[0]] || null
        )

        return result
      })
    : null
  , [hands, Game, colorPicker]) 

  return (
    <>
      { gameState === STATES.IDLE &&
        <h1>Push start to play</h1>
      }

      {(  gameState === STATES.FLOP ||
          gameState === STATES.RIVER
        ) &&
        <>
          { _dropRight(hands).map((hand, i) => (
              <Hand
                highlights={gameState === STATES.RIVER && highlights[i]}
                visible={gameState === STATES.RIVER}
                key={`cardstack_${i}`}
                cards={hand}
              />
            ))
          }

          <Hand
            highlights={_last(highlights)}
            visible
            cards={_last(hands)}
          />
        </>
      }

      { gameState === STATES.DEAL &&
          winners.map(winnerIndex => (
            <>
              <Hand
                  title={winnerIndex === hands.length - 1 ? "You win!" : `Player ${winnerIndex} wins with:`}
                  visible
                  highlights={highlights[winnerIndex]}
                  cards={hands[winnerIndex]}            
              />
            </>
          ))
      }
    </>
  )
}
