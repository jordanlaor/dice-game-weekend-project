import "./dice.css";
const Dice = (props) => {
  return <div className={`dice dice-${props.diceValue}`}></div>;
};
export default Dice;
