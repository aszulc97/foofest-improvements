import { useState } from "react";

export default function BandPopUp(props) {
  const [readMore, setReadMore] = useState(false);

  let logoUrl = "";
  function handleClose() {
    props.hidePopUp();
  }

  function showReadMore() {
    setReadMore((old) => !old);
  }

  function handleLogo(logoString) {
    if (logoString.substring(0, 4) === "http") {
      return logoString;
    } else {
      return "https://foofest2022.herokuapp.com/logos/" + logoString;
    }
  }
  logoUrl = handleLogo(props.band.logo);

  return (
    <div className="popUpContainer">
      <div className="popUp">
        <img src={logoUrl} alt={props.band.name} />
        <button className="closeButton" onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#999"
            className="bi bi-x-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
          </svg>
        </button>
        <div>
          <div className="popUpName">
            <h2>{props.band.name}</h2>
            <h5>Genre: {props.band.genre}</h5>
          </div>
          <h4 className="members">{props.band.members.join(", ")}</h4>
          <div className="bioP">
            <p>{props.band.bio.substring(0, props.band.bio.indexOf(".") + 1)}</p>
            <p style={!readMore ? { display: "none" } : null}> {props.band.bio.substring(props.band.bio.indexOf(".") + 1)}</p>
            <button className="readMore" onClick={showReadMore}>
              {readMore ? "Show less" : "Read more"}
            </button>
          </div>
          {props.band.logoCredits && <p className="logoCredits">Image Source:{props.band.logoCredits}</p>}
        </div>
      </div>
    </div>
  );
}
