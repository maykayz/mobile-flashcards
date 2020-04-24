import {RECEIVE_DECKS,ADD_DECK,ADD_CARD} from '../actions/types'
import  {getDecks}  from '../utils/helpers'

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title
  };
}

export function addCardToDeck(deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card
  };
}

export function handleInitialData() {
  return dispatch => {
    return getDecks().then(decks => {
      dispatch(receiveDecks(decks));
    });
  };
}
