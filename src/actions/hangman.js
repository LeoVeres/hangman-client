import { API_BASE_URL } from '../config';

export const FETCH_HANGMAN_ERROR = 'FETCH_HANGMAN_ERROR';
const fetchHangmanError = err => ({
  type: FETCH_HANGMAN_ERROR,
  err,
});

export const FETCH_HANGMAN_SUCCESS = 'FETCH_HANGMAN_SUCCESS';
const fetchHangmanSuccess = hangman => ({
  type: FETCH_HANGMAN_SUCCESS,
  payload: hangman,
});


export const CORRECT_GUESS = 'CORRECT_GUESS';
export const correctGuess = data => ({
  type: CORRECT_GUESS,
  payload: data,
});

export const WRONG_GUESS = 'WRONG_GUESS';
export const wrongGuess = data => ({
  type: WRONG_GUESS,
  payload: data,
});


export const fetchHangman = () => (dispatch, getState) => {
  return fetch(`${API_BASE_URL}/game`, {
    method: 'GET',
  })
  .then(res => res.json())
  .then((data) => {console.log(data);
  dispatch(fetchHangmanSuccess(data)
)})
    .catch(err => {
      dispatch(fetchHangmanError(err));
    });
};

export const submitUserAnswer = answer => (dispatch, getState) => {
  const word = getState().hangman.word;
  const dashes = getState().hangman.dashes;
  const guessleft = getState().hangman.hangmanStatus;

  return fetch(`${API_BASE_URL}/game`,{
    method: "POST",
    body: JSON.stringify({"guess":answer, "word":word, "dashes":dashes, "guessleft":guessleft})
    })
    .then(res => res.json())
    .then((data) =>{
      console.log(data)
     if(data[1]<guessleft){
      dispatch(wrongGuess(answer));
      }
     else{
      dispatch(correctGuess(data[0]));
      }
    })
    .catch(err => {});
};


