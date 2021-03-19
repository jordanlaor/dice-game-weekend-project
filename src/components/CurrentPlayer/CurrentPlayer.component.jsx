import "./currentPlayer.css";
function CurrentPlayer({ player, currentScore }) {
  return (
    <div className="current-player  ">
      <h2>{player.name}</h2>
      <div>current score: {currentScore}</div>
      <div>
        total score (with current score): {player.totalScore} ({player.totalScore + currentScore})
      </div>
      <div>Won rounds: {player.wins}</div>
    </div>
  );
}

export default CurrentPlayer;
