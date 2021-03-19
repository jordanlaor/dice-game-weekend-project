import "./input.css";
function Input({ name, id, input, handleInputChange, type, defaultValue, label }) {
  return (
    <label htmlFor={id}>
      {label}
      <input
        type={type}
        id={id}
        min={type === "number" ? "1" : undefined}
        minLength="1"
        defaultValue={defaultValue}
        name={name}
        value={input}
        onChange={handleInputChange}
      />
    </label>
  );
}
export default Input;
