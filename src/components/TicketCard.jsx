import React from "react";
import CountTicket from "./CountTicket";

function TicketCard(props) {
  return (
    <div className="ticketContainer">
      <div className="svgWave">
        <h3>{props.title} </h3>
      </div>
      <ul>
        {props.description.split(";").map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h4>{props.price}</h4>
      <p>{props.amount}</p>
      <CountTicket
        title={props.title}
        count={props.count}
        incrementCount={props.incrementCount}
        decrementCount={props.decrementCount}
        soldout={props.soldout}
      />
    </div>
  );
}

export default TicketCard;
