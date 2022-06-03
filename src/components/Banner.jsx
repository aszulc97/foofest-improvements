import { Link } from "react-router-dom";

function Banner(props) {
  return (
    <div className="bannerContainer">
      <div className="bannerImage" style={props.style}>
        <div className="bgBannerFadeOut">
          <Link to={props.name}>
            {props.title}
            <div className={props.buttonText === "Schedule" ? "secondaryCTA" : "primaryCTA"}>
              {props.buttonText}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;
