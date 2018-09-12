import React, { Component } from 'react';
import Chap2_1 from '../Chap2/Chap2_1.js';
import Chap2_2 from '../Chap2/Chap2_2.js';
import Chap2_3 from '../Chap2/Chap2_3.js';

class Chap1_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: this.props.start,
      status: this.props.status,
      inputValue: "",
      tonesWithA: null,
      tonesWithB: null
    };
  }

  calScore(arr) {
    let score = 0;
    arr.forEach((obj) => obj.tone_id === "polite" || obj.tone_id === "excited" ? score += obj.score :
                         obj.tone_id === "impolite" || obj.tone_id === "frustrated" ? score-= obj.score * 2 :
                         obj.tone_id === "sad" ? score -= obj.score :
                         score += obj.score * 2 )
    return score;
  }

  async chatWithTwoPeople(name) {
    let arr = [{text: this.state.inputValue}]
    let result = await this.props.checkEmotionsOfChat(arr);
    let obj = result[0].tones;
    if (!this.state.tonesWithA) {
      this.setState({tonesWithA: obj});
    } else {
      this.setState({tonesWithB: obj});
    }
    if (this.state.tonesWithA && this.state.tonesWithB) {
      let tonesWithA = this.state.tonesWithA;
      let tonesWithB = this.state.tonesWithB;
      let scoreA, scoreB;
      if (typeof tonesWithA === "string") {
        scoreA = 0;
      }
      if (typeof tonesWithB === "string") {
        scoreB = 0;
      }
      scoreA = this.calScore(tonesWithA);
      scoreB = this.calScore(tonesWithB);
      console.log(scoreA, scoreB);
      if (scoreA > scoreB) {
        this.setState({status: "Chap2_1"});
      } else if (scoreA < scoreB) {
        this.setState({status: "Chap2_2"});
      } else {
        this.setState({status: "Chap2_3"});
      }
    }
  }

  render() {
    if (!this.state.start) this.props.endGame();
    if (this.state.status === "Chap1_1") {
      return <div>Chap1-1
        <input value={this.state.inputValue} onChange={(e) => this.setState({inputValue: e.target.value})}/>
        <button onClick={() => this.chatWithTwoPeople()}>Submit</button>
      </div>;
    } else if (this.state.status === "Chap2_1") {
      return <Chap2_1 checkEmotionsOfChat={(i) => this.props.checkEmotionsOfChat(i)}
                      checkEmotionsOfEmail={(i) => this.props.checkEmotionsOfEmail(i)}
                      endGame={() => this.props.endGame()}
                      status={this.state.status}
                      start={this.state.start}/>
    } else if (this.state.status === "Chap2_2") {
      return <Chap2_2 checkEmotionsOfChat={(i) => this.props.checkEmotionsOfChat(i)}
                      checkEmotionsOfEmail={(i) => this.props.checkEmotionsOfEmail(i)}
                      endGame={() => this.props.endGame()}
                      status={this.state.status}
                      start={this.state.start}/>
    } else if (this.state.status === "Chap2_3") {
      return <Chap2_3 checkEmotionsOfChat={(i) => this.props.checkEmotionsOfChat(i)}
                      checkEmotionsOfEmail={(i) => this.props.checkEmotionsOfEmail(i)}
                      endGame={() => this.props.endGame()}
                      status={this.state.status}
                      start={this.state.start}/>
    } else {
      return <div>Game over</div>
    }
  }
}

export default Chap1_1;
