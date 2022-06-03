export default function RadioButton(props) {
  function handleChange() {
    props.filterFunction(props.value);
  }

  return (
    <div className="radioButton">
      <input type="radio" id={props.name + props.number} name={props.name} value={props.value} onChange={handleChange} />
      <label htmlFor={props.name + props.number}>
        <p className="labelTop">{props.labelTop}</p>{" "}
        <p className="labelBottom" style={{ color: props.color }}>
          {props.labelBottom}
        </p>
      </label>
    </div>
  );
}
