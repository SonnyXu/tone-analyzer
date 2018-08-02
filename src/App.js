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

  // checkEmotionsOfEmail(str) {
  //   fetch("https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2018-06-15", {
  //     method: "POST",
  //     headers: new Headers({
  //       "Content-Type": "application/json",
  //       "Authorization": "Basic " + base64.encode(username + ":" + password)
  //     }),
  //     body: JSON.stringify({
  //       text: str
  //     })
  //   }).then(res => res.json())
  //   .then((resp) => {
  //     console.log(resp);
  //     if (resp.document_tone.tones.length > 0) {
  //       console.log(resp.document_tone.tones);
  //       return resp.document_tone.tones;
  //     } else {
  //       console.log("No emotion");
  //       return;
  //     }
  //   })
  //   .catch((err) => {
  //     // network error
  //     console.log('error', err)
  //   })
  // }

  checkEmotionsOfChat(arr) {
    fetch("http://localhost:1337/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        utterances: arr
      })
    })
    // .then((resp) => {
    //   console.log(resp);
    //   if (resp.utterances_tone.length > 0) {
    //     console.log(resp.utterances_tone);
    //     return resp.utterances_tone;
    //   } else {
    //     console.log("No emotion");
    //     return;
    //   }
    // })
    .catch((err) => {
      // network error
      console.log('error', err)
    })
  }

  render() {
    if (this.state.status) {
      return <Chap0_1 />
    } else {
      return <div className="App">
        <h1>Welcome to the game</h1>
        <button onClick={() => this.checkEmotionsOfChat()}>Start Game</button>
        <button onClick={() => this.endGame()}>End Game</button>
      </div>
    }
  }
}

export default App;
