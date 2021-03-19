import React from "react";
import Dice from "../Dice/Dice.component";
import Button from "../Button/Button.component";
import ScoreBoard from "../ScoreBoard/ScoreBoard.component";
import CurrentPlayer from "../CurrentPlayer/CurrentPlayer.component";
import Input from "../Input/Input.component";
import "./game.css";

class Game extends React.Component {
  state = {
    gameState: -1,
    currentPlayerIndex: 0,
    players: [],
    currentScore: 0,
    dices: [1, 1],
    targetScore: 100,
    input: { players: "Player 1,Player 2", targetScore: "100" },
    winner: "",
  };

  setLocalStorage = () => {
    localStorage.setItem("game", JSON.stringify(this.state));
  };

  getLocalStorage = () => {
    return JSON.parse(localStorage.getItem("game"));
  };

  rollTheDice = () => {
    this.setState({ dices: this.state.dices.map((dice) => Math.floor(Math.random() * 6) + 1) }, this.checkDices);
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
        return { currentScore: prevState.currentScore + prevState.dices.reduce((acc, dice) => acc + dice) };
      });
    }
  };

  drawTheDices = () => {
    return (
      <div className="dices">
        {this.state.dices.map((dice) => (
          <Dice diceValue={dice} />
        ))}
      </div>
    );
  };

  hold = () => {
    this.setState(
      (prevState) => ({
        players: prevState.players.map((player, index) =>
          index === prevState.currentPlayerIndex
            ? { name: player.name, totalScore: player.totalScore + prevState.currentScore, wins: player.wins }
            : { name: player.name, totalScore: player.totalScore, wins: player.wins }
        ),
      }),
      () => {
        const indexWinner = this.state.players.findIndex((player) => player.totalScore >= this.state.targetScore);
        if (indexWinner > -1) {
          this.setState((prevState) => ({
            gameState: 1,
            winner: this.state.players[indexWinner],
            players: prevState.players.map((player, index) =>
              index === indexWinner
                ? { name: player.name, totalScore: player.totalScore, wins: player.wins + 1 }
                : { name: player.name, totalScore: player.totalScore, wins: player.wins }
            ),
          }));
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

  resetGame = () => {
    this.setState({
      gameState: -1,
      currentPlayerIndex: 0,
      players: [],
      currentScore: 0,
      dices: [1, 1],
      targetScore: 100,
      input: { players: "Player 1,Player 2", targetScore: "100" },
      winner: "",
    });
  };

  handleInputChange = (e) => {
    this.setState((prevState) => {
      const input = prevState.input;
      input[e.target.name] = e.target.value;
      return { input };
    });
  };

  startGame = () => {
    this.setState((prevState) => {
      const playersNames = prevState.input.players.split(",").filter((name) => name);
      while (playersNames.length < 2) {
        playersNames.push(`Player ${playersNames.length + 1}`);
      }
      const players = playersNames.map((player) => ({ name: player, totalScore: 0, wins: 0 }));
      return { players, targetScore: parseInt(prevState.input.targetScore), gameState: 0 };
    });
  };

  newRound = () => {
    this.setState((prevState) => ({
      gameState: 0,
      players: prevState.players.map((player) => ({ name: player.name, totalScore: 0, wins: player.wins })),
    }));
  };

  drawGame = () => {
    switch (this.state.gameState) {
      case -1:
        // Starter screen
        return (
          <div className="game game-welcome">
            <h1>
              Welcome to the Dice Game! <i class="fas fa-dice"></i>
            </h1>
            <div className="intro">
              <div>
                This is a simple dice game where two players (or more- just seperate the players with a comma) have the chance to roll the
                dices to try and achieve a score of 100 (or the target score you define in here...)
              </div>
              <div className="--margin-top">
                Each player repeatedly rolls the dices until either a double 6 is rolled or the player decides to "hold".
              </div>
              <div>
                <div className="--margin-top">The rules of the game are:</div>
                <div className="--margin-top">
                  A player can roll the dices as many times as he desires (as long as he doesn't roll a double 6).
                </div>
                <div>All of the turn rolls gets summed up to the turn total score.</div>
                <div>If a player rolls a double 6, their total score stays untouched and it becomes the next player's turn.</div>
                <div>
                  If the player chooses to "hold", their turn total is added to their total score, and it becomes the next player's turn.
                </div>
                <div className="--margin-top">The player who first scores the target score wins.</div>
                <div>Then You can Choose to play another round.</div>
                <div>The number of wins is saved between rounds.</div>
                <div>At any point you can choose to start a new game - that will reset everything.</div>
              </div>
            </div>
            <div className="inputs">
              <Input
                name="players"
                id="players"
                // defaultValue="Player 1,Player 2"
                input={this.state.input.players}
                handleInputChange={this.handleInputChange}
                type="text"
                label="Players names, seperated with a comma: "
              />
              <Input
                name="targetScore"
                id="targetScare"
                // defaultValue="100"
                input={this.state.input.targetScore}
                handleInputChange={this.handleInputChange}
                type="number"
                label="The target score: "
              />
            </div>
            <div className="buttons">
              <Button handleButtonClick={this.startGame} text="Start to Play" />
            </div>
          </div>
        );

      case 0:
        // While playing
        return (
          <div className="game game-main">
            <h1>
              The Dice Game! <i class="fas fa-dice"></i>
            </h1>
            <ScoreBoard
              currentPlayerIndex={this.state.currentPlayerIndex}
              players={this.state.players}
              targetScore={this.state.targetScore}
            />
            <CurrentPlayer player={this.state.players[this.state.currentPlayerIndex]} currentScore={this.state.currentScore} />
            {this.drawTheDices()}
            <div className="buttons">
              <Button handleButtonClick={this.rollTheDice} text="Roll the dice" />
              <Button handleButtonClick={this.hold} text="Hold" />
              <Button handleButtonClick={this.resetGame} text="New Game" />
            </div>
          </div>
        );
      case 1:
        // Someone won
        return (
          <div className="game game-win">
            <h1>
              The winner is {this.state.winner.name} <i class="fas fa-dice"></i>
            </h1>
            <div className="intro">
              <div>Click New round to keep playing together.</div>
              <div className="--margin-top">Click new game to reset all settings and wins.</div>
            </div>
            <div className="buttons">
              <Button handleButtonClick={this.newRound} text="New Round" />
              <Button handleButtonClick={this.resetGame} text="New Game" />
            </div>
          </div>
        );

      default:
        break;
    }
  };

  componentDidMount() {
    const localStorageState = this.getLocalStorage();
    if (localStorageState) {
      const localStorageStateKeys = Object.keys(localStorageState);
      const newState = {};
      localStorageStateKeys.forEach((key) => (newState[key] = localStorageState[key]));
      this.setState(newState);
    } else {
      this.setState((prevState) => ({
        players: prevState.players.map((player) => ({ name: player.name, totalScore: 0, wins: player.wins })),
        currentScore: 0,
      }));
    }
  }

  componentDidUpdate = () => {
    this.setLocalStorage();
  };

  render() {
    console.log(this.state);
    return <div className="game-wrapper">{this.drawGame()}</div>;
  }
}

export default Game;
