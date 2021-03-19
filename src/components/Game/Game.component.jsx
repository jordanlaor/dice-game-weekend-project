import React from "react";
import Dice from "../Dice/Dice.component";
import Button from "../Button/Button.component";
import ScoreBoard from "../ScoreBoard/ScoreBoard.component";
import CurrentPlayer from "../CurrentPlayer/CurrentPlayer.component";

class Game extends React.Component {
  state = {
    gameState: -1,
    currentPlayerIndex: 0,
    players: [{ name: "Player 1" }, { name: "Player 2" }],
    currentScore: [],
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
        players: prevState.players.map((player, index) =>
          index === prevState.currentPlayerIndex
            ? { name: player.name, totalScore: player.totalScore + prevState.currentScore }
            : { name: player.name, totalScore: player.totalScore }
        ),
      }),
      () => {
        const index = this.state.players.findIndex((player) => player.totalScore >= this.state.targetScore);
        if (index > -1) {
          this.setState({ isWon: 1 });
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

  newGame = () => {
    this.setState({
      isWon: false,
      currentPlayerIndex: 0,
      players: [
        { name: "Player 1", totalScore: 0 },
        { name: "Player 2", totalScore: 0 },
      ],
      currentScore: 0,
      dices: [0, 0],
      targetScore: 100,
    });
  };

  drawGame = () => {
    switch (this.state.gameState) {
      case -1:
        // Starter screen

        break;
      case 0:
        // While playing
        console.log("0");
        return (
          <div>
            <ScoreBoard currentPlayerIndex={this.state.currentPlayerIndex} players={this.state.players} />
            <CurrentPlayer
              player={this.state.players[this.state.currentPlayerIndex].name}
              currentScore={this.state.currentScore}
              totalScore={this.state.players[this.state.currentPlayerIndex].totalScore}
            />
            {this.drawTheDices()}
            <Button handleButtonClick={this.rollTheDice} text="Roll the dice" />
            <Button handleButtonClick={this.hold} text="Hold" />
            <Button handleButtonClick={this.newGame} text="New Game" />
          </div>
        );
      case 1:
        // Someone won
        break;

      default:
        break;
    }
  };

  componentDidMount() {
    this.setState((prevState) => ({ players: prevState.players.map((player) => ({ name: player.name, totalScore: 0 })), currentScore: 0 }));
  }

  render() {
    return <div></div>;
  }
}

export default Game;
