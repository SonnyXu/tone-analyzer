import React, { Component } from 'react';
import Chap0_1 from './Chap0/Chap0_1'
import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: false,
      status: null
    };
  }

  startGame() {
    this.setState({
      start: true,
      status: "Chap0_1"
    });
  }

  endGame() {
    this.setState({
      start: false,
      status: null
    });
  }

  async checkEmotionsOfEmail(str) {
    let result = null;
    await fetch("http://localhost:1337/checkEmotionsOfEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: str
      })
    }).then(res => res.json())
    .then((resp) => {
      console.log(resp);
      if (typeof resp.tone === "object") {
        console.log(resp.tone);
        result = resp.tone;
        return;
      } else {
        console.log("No emotion");
        result = resp.tone;
        return;
      }
    })
    .catch((err) => {
      // network error
      console.log('error', err)
    })
    return result;
  }

  async checkEmotionsOfChat(arr) {
    let result = null;
    await fetch("http://localhost:1337/checkEmotionsOfChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        utterances: arr
      })
    })
     .then(res => res.json())
    .then((resp) => {
      console.log(resp);
      if (typeof resp.tone === "object") {
        console.log(resp.tone);
        result = resp.tone;
        return;
      } else {
        console.log("No emotion");
        result = resp.tone;
        return;
      }
    })
    .catch((err) => {
      // network error
      console.log('error', err)
    });
    return result;
  }

  render() {
    if (this.state.status) {
      return <Chap0_1 checkEmotionsOfChat={(i) => this.checkEmotionsOfChat(i)}
                      checkEmotionsOfEmail={(i) => this.checkEmotionsOfEmail(i)}
                      status={this.state.status}
                      start={this.state.start}
                      endGame={() => this.endGame()}/>
    } else {
      return <div className="App">
        <h1>Welcome to LOVE LIFE!</h1>
        <button className="playButton" onClick={() => this.startGame()}>Start Game</button>
        <button className="exitButton" onClick={() => this.endGame()}>End Game</button>
      </div>
    }
  }
}

export default App;
