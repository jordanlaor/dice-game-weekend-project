import React from "react";
import Dice from "../Dice/Dice.component";
import Button from "../Button/Button.component";

class Game extends React.Component {
  state = { currentPlayerIndex: 0, players: [], currentScores: [], dices: [0, 0], targetScore: 100 };

  rollTheDice = () => {
    this.setState({ dices: this.state.dices.map((dice) => Math.floor(Math.random() * 6) + 1) });
  };

  drawTheDices = () => {
    console.log(this.state.dices);
    return this.state.dices.map((dice) => <Dice diceValue={dice} />);
  };

  // handleButtonRollDiceClick = () => {
  //   this.rollTheDice();
  // };

  componentDidMount() {
    // TODO remove before submit
    // this.rollTheDice();
  }

  render() {
    return (
      <div>
        {this.drawTheDices()}
        <Button handleButtonClick={this.rollTheDice} text="Roll the dice" />
      </div>
    );
  }
}

export default Game;
