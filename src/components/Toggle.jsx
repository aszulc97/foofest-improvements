export default function Toggle(props) {
  function handleChange() {
    props.toggleSwitchFunction();
  }

  return (
    <div className="toggleContainer">
      <div className="switch-button">
        <input className="switch-button-checkbox" type="checkbox" onChange={handleChange}></input>
        <label className="switch-button-label" htmlFor="">
          <span className="switch-button-label-span">Accomodation</span>
        </label>
      </div>
    </div>
  );
}
