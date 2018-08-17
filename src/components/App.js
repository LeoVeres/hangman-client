import React from 'react';
import { connect } from 'react-redux';
import {submitUserAnswer} from '../actions/hangman';
import NavBar from './NavBar.js';


class App extends React.Component {

  onSubmit(e) {
    e.preventDefault();
    let userInput = e.target.userAnswer.value.toLowerCase();
    e.target.userAnswer.value = '';
    this.props.dispatch(submitUserAnswer(userInput));
  }

  render() {
    let gueslist=this.props.pastGuesses.toUpperCase().split('')
    let hangman;
    let response;

    
    switch(this.props.hangmanStatus){
      case 6:
      hangman= <img className="image"src= {require('../imgs/gallows.png')} alt= 'empty gallows'></img>
      break;
      case 5:
      hangman= <img className="image" src= {require('../imgs/head.png')} alt= 'head in gallows'></img>
      break;
      case 4:
      hangman= <img className="image" src= {require('../imgs/torso.png')} alt= 'head and torso gallows'></img>
      break;
      case 3:
      hangman= <img className="image" src= {require('../imgs/onearm.png')} alt= 'head torso and arm in gallows'></img>
      break;
      case 2:
      hangman= <img className="image" src= {require('../imgs/twoarm.png')} alt= 'head torso both arms in gallows'></img>
      break;
      case 1:
      hangman= <img className="image" src= {require('../imgs/oneleg.png')} alt= 'head torso both arms and leg in gallows'></img>
      break;
      case 0:
      hangman= <img className="image" src= {require('../imgs/twoleg.png')} alt= 'head torso both arms and leg in gallows'></img>
      break;
      default:
      hangman= <img className="image" src= {require('../imgs/dead.png')} alt= 'full body in gallows'></img>
      break;
    }
    if(this.props.guessleft===-1){
     response= <div>
              <h3> You killed him!</h3>
              <h3> The answer was '{this.props.correctAnswer}'.</h3>
              </div>
    }
    else if(this.props.correctAnswer===this.props.dashes){
      response = <div>
      <h3> You saved him! </h3>
      <h3>'{this.props.correctAnswer}' was the correct answer.</h3>
      </div>
    }
    else if(this.props.correctAnswer){
      response=       <div className="App">
      <h3 className="dashes">{this.props.dashes}</h3>
      <form className="form" onSubmit={e => this.onSubmit(e)}>
        <input
          className="letter-input"
          type="text"
          name="userAnswer"
          autoComplete="off"
          maxLength="1"
          required
        />
        <button className="submit-btn">submit</button>
      </form>
      <h3>Guesses: {gueslist.join(', ')}</h3>
  </div>
    }
    return (
      <div className="App">
        <NavBar/>
        <div className="container">
        {hangman}
        {response}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    correctAnswer:state.hangman.word,
    guessleft:state.hangman.hangmanStatus,
    pastGuesses: state.hangman.guesses,
    dashes:state.hangman.dashes,
    hangmanStatus:state.hangman.hangmanStatus
  };
};

export default (connect(mapStateToProps)(App));

