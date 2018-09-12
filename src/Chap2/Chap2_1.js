import React, { Component } from 'react';

class Chap2_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: this.props.start,
      status: this.props.status,
      inputValue: ""
    };
  }

  async chatWithA() {
    let arr = [{text: this.state.inputValue}]
    let result = await this.props.checkEmotionsOfChat(arr);
    if (typeof result === "object") {
      let obj = result[0].tones;
      if (obj.some((obj) => obj.tone_id === 'frustrated' || obj.tone_id === 'impolite')) {
        this.props.endGame();
      } else if (obj.some((obj) => obj.tone_id === 'polite' || obj.tone_id === 'excited')) {
        window.alert("Win")
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
    if (this.state.status === "Chap2_1") {
      return <div>Chap2-1
        <input value={this.state.inputValue} onChange={(e) => this.setState({inputValue: e.target.value})}/>
        <button onClick={() => this.chatWithA()}>Submit</button>
      </div>;
    } else {
      return <div>Game over</div>
    }
  }
}

export default Chap2_1;
