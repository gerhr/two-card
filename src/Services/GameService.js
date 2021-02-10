import _flattenDeep from "lodash/flattenDeep"
import _shuffle from "lodash/shuffle"
import _flatten from "lodash/flatten"
import _take from "lodash/take"
import _chunk from "lodash/chunk"
import _zip from "lodash/zip"
import _map from "lodash/map"
import _indexOf from "lodash/indexOf"
import _slice from "lodash/slice"



const RANKS = Object.freeze([ "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"])


const SUITS = Object.freeze([
  "\u2660", // ♠
  "\u2665", // ♥
  "\u2666", // ♦
  "\u2663" // ♣
])


// #This should be the factory method
// with interfaces:
// - card
// - specificy
// - deck
// - hand
export default class GameService {
  constructor(
    players = 2,
    cards = 7
  ){
    this.cardsOnHand = cards
    this.playersNumber = players
    this.cardsStack = null
    this.hands = null
    this.headPosition = null
  }

  start = () => {
    if (!this.cardsStack || !this.cardsStack.length) {
      this.cardsStack = this.getNewDeck()
    }

    this.headPosition = 0
    this.cardsStack = this.shuffle()
  }

  getNewDeck() {
    const result = _flattenDeep(RANKS.map(rank => {
      return SUITS.map(suit => ({
        name: `${suit}${rank}`,
        suit,
        rank
      }))
    }
    ))

    return result
  }

  // Unsecure method
  shuffle = () => {
    const result = _shuffle(this.cardsStack)

    return result
  }

  createHands() {
    this.headPosition = (this.playersNumber * this.cardsOnHand) - 1

    const shiftedCards = _take(this.cardsStack, this.headPosition + 1)

    const chunkedCards = _chunk(shiftedCards, this.cardsOnHand)

    const stacks = _flatten(_zip(chunkedCards))

    const cards = _map(stacks, stack =>
      _map(stack, ({ rank, suit }) => [rank, suit])
    )

    return cards
  }

  solve = (cardsStack) => {
    // I would Better use specificy map
    // for cardStack combination
    // Example:
    // [A,2,0,0,0,0] ~ One Pair of Two with Ace kicker
    // [A,2,10,0,0,0] ~ Two Pairs of Two and Tens with Queen kicker
    // [10,0,0,0,6,0] ~ Square of Sixs with Ten kicker

    // But now i just need  just a twos
    const pairs = this.solvePairs(cardsStack)

    return pairs
  }

  getCardRank = card => card[0]

/* 
  I would use functional style, like:
    _flow([
      _curryRight(_groupBy)(this.getCardRank),
      _curryRight(_reduce)(
        (result, el) => [...result, ..._chunk(el, 2)]
        ,[]
      ),
      _curryRight(_filter)(el => el.length > 1 ),
      _curryRight(_map)(el => ({
        rank: el[0].rank,
        cards: _map(el, card => card.name)
      }))
    ])(cards)

    but...
*/
  solvePairs = cards => {
    console.clear()

    let pairs = []

    cards.forEach(([headCardRank], i) => {
      _slice(cards, i + 1, cards.length)
        .map(([testCardRank]) =>
          testCardRank === headCardRank &&
          !pairs.includes(headCardRank) &&
          pairs.push(headCardRank)
        )
    })

    return pairs
  }

  solveKicker = cards => {
    let kickerPower = null

    cards.forEach(([rank]) => {
      const power = _indexOf(RANKS, rank)
      
      if (!kickerPower || power > kickerPower) {
        kickerPower = power
      }
    })

    return kickerPower
  }

  winners = hands => {
    let winners = []
    let winLength = 0

    // Count Pairs
    hands.map((hand, i) => { // eslint-disable-line array-callback-return
      const pairs = this.solve(hand)

      if (pairs.length === winLength) {
        winners.push(i)
      } else if(pairs.length >= winLength) {
        winners = [i]
        winLength = pairs.length
      }
    })

    if(winners.length !== 1) {
      let winnersByKicker = []
      let winnerKickerPower = null

      winners.forEach(winnerIndex => {
        const handKickerPower = this.solveKicker(hands[winnerIndex])

        if (!winnersByKicker.length || handKickerPower === winnerKickerPower) {
          winnersByKicker.push(winnerIndex)
        } else if ( handKickerPower > winnerKickerPower) {
          winnersByKicker = [winnerIndex]
          winnerKickerPower = handKickerPower
        }
      })

      winners = winnersByKicker
    }

    return winners
  }
}
