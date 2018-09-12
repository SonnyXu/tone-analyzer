import React, { Component } from 'react';
import Chap2_2 from '../Chap2/Chap2_2.js';
import Chap2_3 from '../Chap2/Chap2_3.js';

class Chap1_2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: this.props.start,
      status: this.props.status,
      inputValue: ""
    };
  }

  async chatWithB() {
    let arr = [{text: this.state.inputValue}]
    let result = await this.props.checkEmotionsOfChat(arr);
    if (typeof result === "object") {
      let obj = result[0].tones;
      if (obj.some((obj) => obj.tone_id === 'frustrated' || obj.tone_id === 'impolite')) {
        this.props.endGame();
      } else if (obj.some((obj) => obj.tone_id === 'polite' || obj.tone_id === 'excited')) {
        this.setState({
          status: "Chap2_2"
        });
      } else {
        this.setState({
          status: "Chap2_3"
        });
      }
    } else {
      this.setState({inputValue: ""});
      return;
    }
  }

  render() {
    if (!this.state.start) this.props.endGame();
    if (this.state.status === "Chap1_2") {
      return <div>Chap1-1
        <input value={this.state.inputValue} onChange={(e) => this.setState({inputValue: e.target.value})}/>
        <button onClick={() => this.chatWithB()}>Submit</button>
      </div>;
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

export default Chap1_2;
