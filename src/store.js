import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import hangmanReducer from './reducers/hangman';


const store = createStore(
  combineReducers({
    form: formReducer,
    hangman: hangmanReducer
  }),
  applyMiddleware(thunk)
);
export default store