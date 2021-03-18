import React from "react";
import Dice from "../Dice/Dice.component";

class Game extends React.Component {
  state = { currentPlayerIndex: 0, players: [], currentScores: [], dices: [], targetScore: 100 };
  rollTheDice() {
    this.setState({ dices: this.state.dices.map((dice) => Math.floor(Math.random() * 6) + 1) });
  }
  drawTheDices() {
    return this.state.dices.map((dice) => <Dice diceValue={dice} />);
  }
  render() {
    return <div>{this.drawTheDices()}</div>;
  }
}
