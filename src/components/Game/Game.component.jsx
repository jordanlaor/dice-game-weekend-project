import React from "react";
import Dice from "../Dice/Dice.component";
import Button from "../Button/Button.component";

class Game extends React.Component {
  state = {
    isWon: false,
    currentPlayerIndex: 0,
    players: ["Player 1", "Player 2"],
    currentScore: [],
    totalScores: [],
    dices: [0, 0],
    targetScore: 100,
  };

  rollTheDice = () => {
    this.setState({ dices: this.state.dices.map((dice) => Math.floor(Math.random() * 6) + 1) }, this.checkDices);
  };

  drawTheDices = () => {
    console.log(this.state.dices, this.state);
    return this.state.dices.map((dice) => <Dice diceValue={dice} />);
  };

  checkDices = () => {
    if (this.state.dices.filter((dice) => dice === 6).length === this.state.dices.length) {
      this.setState((prevState) => {
        return prevState.currentPlayerIndex + 1 === prevState.players.length
          ? { currentPlayerIndex: 0, currentScore: 0 }
          : { currentPlayerIndex: prevState.currentPlayerIndex + 1, currentScore: 0 };
      });
    } else {
      this.setState((prevState) => {
        console.log(prevState.dices.reduce((acc, dice) => acc + dice));
        return { currentScore: prevState.currentScore + prevState.dices.reduce((acc, dice) => acc + dice) };
      });
    }
  };

  hold = () => {
    this.setState(
      (prevState) => ({
        totalScores: prevState.totalScores.map((totalScore, index) =>
          index === prevState.currentPlayerIndex ? totalScore + prevState.currentScore : totalScore
        ),
      }),
      () => {
        const index = this.state.totalScores.findIndex((score) => score >= this.state.targetScore);
        if (index > -1) {
          this.setState({ isWon: true });
          // TODO add winner handler
        }
      }
    );
    this.setState((prevState) => {
      return prevState.currentPlayerIndex + 1 === prevState.players.length
        ? {
            currentPlayerIndex: 0,
            currentScore: 0,
          }
        : {
            currentPlayerIndex: prevState.currentPlayerIndex + 1,
            currentScore: 0,
          };
    });
  };

  componentDidMount() {
    this.setState((prevState) => ({ totalScores: prevState.players.map((player) => 0), currentScore: 0 }));
  }

  render() {
    return (
      <div>
        {this.drawTheDices()}
        <Button handleButtonClick={this.rollTheDice} text="Roll the dice" />
        <Button handleButtonClick={this.hold} text="Hold" />
      </div>
    );
  }
}

export default Game;
