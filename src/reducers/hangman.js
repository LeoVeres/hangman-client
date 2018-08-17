import {
  FETCH_HANGMAN_ERROR,
  WRONG_GUESS,
  CORRECT_GUESS,
  FETCH_HANGMAN_SUCCESS,
} from '../actions/hangman';

const initialState = {
  hangmanStatus:6,
  error: null,
  loading: null,
  guesses:'',
  dashes:'',
  word:null
};


export default function questionReducer(state = initialState, action) {
  if (action.type === FETCH_HANGMAN_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      error: null,
      hangmanStatus: 6,
      guesses:'',
      dashes:action.payload[1],
      word:action.payload[0].word
    });
  }
  if (action.type === WRONG_GUESS) {
    return Object.assign({}, state, {
      loading: false,
      error: null,
      hangmanStatus: state.hangmanStatus-1,
      guesses: state.guesses+action.payload
    });
  }
  if (action.type === CORRECT_GUESS) {
    return Object.assign({}, state, {
      loading: false,
      error: null,
      dashes: action.payload
    });
  }
  if (action.type === FETCH_HANGMAN_ERROR) {
    return Object.assign({}, state, {
      hangmanStatus: null,
      loading: false,
      error: action.err,
    });
  }
  else {
    return state;
  }
}