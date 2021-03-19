import "./scoreBoard.css";
function scoreBoard({ currentPlayerIndex, players }) {
  console.log("scoreBoard" + players.filter((player, index) => index !== currentPlayerIndex));
  return (
    <ul>
      {players
        .filter((player, index) => index !== currentPlayerIndex)
        .map((player) => {
          return (
            <li>
              {player.name}: {player.totalScore}
            </li>
          );
        })}
    </ul>
  );
}

export default scoreBoard;
