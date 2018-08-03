import React, { Component } from 'react';
import Chap1_1 from '../Chap1/Chap1_1.js'
class Chap0_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: this.props.start,
      status: this.props.status,
      inputValue: ""
    };
  }

  async chatWithTeacher() {
    let arr = [{text: this.state.inputValue}]
    let result = await this.props.checkEmotionsOfChat(arr);
    if (typeof result === "object") {
      let obj = result[0].tones;
      if (obj.some((obj) => obj.tone_id === 'frustrated' || obj.tone_id === 'impolite')) {
        this.props.endGame();
      } else if (obj.some((obj) => obj.tone_id === 'polite' && obj.score > 0.6)) {
        this.setState({
          status: "Chap1_1"
        });
      } else {
        this.setState({inputValue: ""});
      }
    } else {
      this.setState({inputValue: ""});
      return;
    }
  }

  render() {
    if (!this.state.start) this.props.endGame();
    if (this.state.status === "Chap0_1") {
      return <div>
        <input value={this.state.inputValue} onChange={(e) => this.setState({inputValue: e.target.value})}/>
        <button onClick={() => this.chatWithTeacher()}>Submit</button>
      </div>;
    } else if (this.state.status === "Chap1_1") {
      return <Chap1_1 checkEmotionsOfChat={(i) => this.props.checkEmotionsOfChat(i)}
                      checkEmotionsOfEmail={(i) => this.props.checkEmotionsOfEmail(i)}
                      endGame={() => this.props.endGame()}
                      status={this.state.status}
                      start={this.state.start}/>
    } else {
      return <div>Game over</div>
    }
  }
}

export default Chap0_1;
