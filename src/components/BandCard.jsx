export default function BandCard(props) {
  let logoUrl = "";
  function handleClick() {
    let info ={
      band: props.band,
      stage: props.stage,
      time: props.time,
      day: props.day,
    }
    props.showPopUpFunction(info);
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
    <button className={`bandCard ${props.stage}`} onClick={handleClick}>
      <img src={logoUrl} alt={props.band.name} />
      <h4>{props.band.name}</h4>
    </button>
  );
}
