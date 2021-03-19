import "./currentPlayer.css";
function CurrentPlayer({ player, currentScore, totalScore }) {
  return (
    <div>
      <h2>{player}</h2>
      <div>current: {currentScore}</div>
      <div>total: {totalScore}</div>
    </div>
  );
}

export default CurrentPlayer;
