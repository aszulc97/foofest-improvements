export default function Schedule(props) {
  function displaySchedule(item) {
    return (
      <li
        key={item.act + item.start}
        style={
          item.act !== "break"
            ? {
                cursor: "pointer",
              }
            : null
        }
        onClick={
          item.act !== "break"
            ? () => {
                displayPopUp();
              }
            : null
        }
        className={`${item.act === "break" ? "break" : "band"} `}
      >
        <div>
          <span className={`${item.cancelled ? "cancelled" : null} time} `}>{item.start}</span>{" "}
          <p className={`${item.cancelled ? "cancelled" : null}`} style={item.act.toLowerCase().includes(props.searchInput) && props.searchInput!=="" &&item.act!=="break" ? {backgroundColor:"#ffff99"} : null}>{item.act}</p>
          {item.cancelled && <p className="cancelledText">CANCELLED</p>}
        </div>
      </li>
    );

    function displayPopUp() {
      let info ={
        band: props.bands.find((band) => band.name === item.act),
        stage: props.stageName,
        time: item.start,
        day: item.day,
      }
      props.showPopup(info)    }
  }

  return (
    <div className="schedule">
      <div className="waveDiv">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" fill="none" viewBox="0 0 475 140">
          <path
            fill={props.color}
            d="M475 30.54v72.635L0 104V30.54C1.884 7.85 14.767 2.802 47.3 0h383.387c30.261 1.108 39.06 8.551 44.313 30.54Z"
          />
          <path
            fill={props.color}
            fillRule="evenodd"
            d="m0 127.372 19.792-1.39c19.791-1.389 59.375-4.169 98.958 0 39.583 4.17 79.167 15.288 118.75 13.899 39.583-1.39 79.167-15.288 118.75-22.237 39.583-6.95 79.167-6.95 98.958-6.95H475V69H0v58.372Z"
            clipRule="evenodd"
          />
        </svg>
        <div className="stageHeader">
          <p>Stage {props.stageNumber}</p>
          <h3>{props.stageName.toUpperCase()}</h3>
        </div>
      </div>
      <ul className="sessions">{props.displayed.map((item) => displaySchedule(item))}</ul>
    </div>
  );
}
