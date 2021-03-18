import "./button.css";
function Button(props) {
  return <button onClick={props.handleButtonClick}>{props.text}</button>;
}
export default Button;
