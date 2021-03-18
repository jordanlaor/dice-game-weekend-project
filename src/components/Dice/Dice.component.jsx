import "./dice.css";
const Dice = (props) => {
  return <div className="dice" className={`dice-${props.diceValue}`}></div>;
};
export default Dice;
