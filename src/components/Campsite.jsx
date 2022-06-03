import ListItem from "./ListItem";

export default function Campsite(props) {
  return (
    <div className="campsiteContainer">
      <img src={props.img} alt="tents"></img>
      <div className="campsiteInfo">
        <h3>{props.name}</h3>
        <hr></hr>
        <ul>
          {props.desc.split(";").map((item) => (
            <ListItem content={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}
