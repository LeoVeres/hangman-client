import React from 'react';
import { connect } from 'react-redux';
import {fetchHangman} from '../actions/hangman';


class NavBar extends React.Component {

  onClick(e) {
    e.preventDefault();
    console.log('new game fired')
    this.props.dispatch(fetchHangman());
  }

  render() {
    return (
    <div class="navbar">
      <img className="logo"src= {require('../imgs/hangmanlogo.png')} alt= 'hangman'></img>
      <button class="nav-btn" type="submit" onClick={e => this.onClick(e)}>New Game</button>
    </div>

    );
  }
}

const mapStateToProps = state => {
  return {

  };
};

export default (connect(mapStateToProps)(NavBar));