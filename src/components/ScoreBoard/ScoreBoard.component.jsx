import "./scoreBoard.css";
function scoreBoard({ currentPlayerIndex, players, targetScore }) {
  console.log("scoreBoard" + players.filter((player, index) => index !== currentPlayerIndex));
  return (
    <ul className="scoreboard">
      <li className="target-score">
        <h3>Target Score: {targetScore}</h3>
      </li>
      <li className="players-score">
        <ul>
          {players
            .filter((player, index) => index !== currentPlayerIndex)
            .map((player) => {
              return (
                <li className="player-score">
                  <h4>{player.name}</h4>
                  <div>Total Score: {player.totalScore}</div>
                  <div>Won rounds: {player.wins}</div>
                </li>
              );
            })}
        </ul>
      </li>
    </ul>
  );
}

export default scoreBoard;
