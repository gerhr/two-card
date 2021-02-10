import { StateMachine } from "use-state-machine"


export const STATES = Object.freeze({
  IDLE: "idle",
  FLOP: "flop",
  RIVER: "river",
  DEAL: "deal",
})

// It would be better to use XState instead
// but in leak of time i've decided to use
// simple version of with crutches
export default new StateMachine({
  initial: STATES.IDLE,
  idle: {
    startGame: STATES.FLOP,
    value: {}
  },
  flop: {
    showRiver: STATES.RIVER,
    value: {}
  },
  river: {
    showWinner: STATES.DEAL,
    value: {}
  },
  deal: {
    finishGame: STATES.IDLE,
    startGame: STATES.FLOP,
    value: {}
  }
})
