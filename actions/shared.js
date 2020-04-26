import { getDecks,saveDeck ,saveDeckTitle} from '../utils/helpers'
import {receiveDecks,addCardToDeck,addDeck} from '../actions/index'

export function handleInitialData () {
  return (dispatch) => {
    return getDecks()
      .then(decks => {
        dispatch(receiveDecks(decks))
      })
  }
}

export function handleAddDeck(title) {
  return (dispatch) => {
    saveDeck(title)
    dispatch(addDeck(title))
  }
}

export function handleAddCardToDeck(title,card){
  return (dispatch) => {
    saveDeckTitle(title,card)
    dispatch(addCardToDeck(title,card))
  }
}
