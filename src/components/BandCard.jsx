export default function BandCard(props) {
  let logoUrl = "";

  function handleClick() {
    props.showPopUpFunction(props.band);
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
