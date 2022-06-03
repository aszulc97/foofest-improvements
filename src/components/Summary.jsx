import React from "react";

function Summary(props) {
  const campingFee = 99;
  let sumPrice =
    props.vipCount * props.vipPrice +
    props.regularCount * props.regularPrice +
    campingFee +
    props.twoPeopleTentPrice * props.twoPeopleTent +
    props.threePeopleTentPrice * props.threePeopleTent +
    props.greenCampingPrice;
  return (
      <div className="sumContainer">
      <h4>Summary</h4>
      <div className="sumCartRow" style={props.vipCount < 1 ? { display: "none" } : null}>
        <p>{props.vipCount}x VIP</p>
        <p>{props.vipCount * props.vipPrice}kr</p>
      </div>
      <div className="sumCartRow" style={props.regularCount < 1 ? { display: "none" } : null}>
        <p>{props.regularCount}x Regular</p>
        <p>{props.regularCount * props.regularPrice}kr</p>
      </div>
      <div className="sumCartRow">
        <p>+ Camping fee</p>
        <p>{campingFee}kr</p>
      </div>
      <div 
        className="sumCartRow"
        style={props.twoPeopleTent < 1 ? { display: "none" } : null}
      >
        <p>{props.twoPeopleTent} x Two people tent</p>
        <p>{props.twoPeopleTent * props.twoPeopleTentPrice}kr</p>
      </div>
      <div
        className="sumCartRow"
        style={props.threePeopleTent < 1 ? { display: "none" } : null}
      >
        <p>{props.threePeopleTent} x Three people tent</p>
        <p>{props.threePeopleTent * props.threePeopleTentPrice}kr</p>
      </div>
      <div
        className="sumCartRow"
        style={props.greenCampingPrice < 1 ? { display: "none" } : null}
      >
        <p>+ Green camping option</p>
        <p>{props.greenCampingPrice}kr</p>
      </div>
      <p className="sumTotal">
        <span>Total </span>
        {sumPrice}kr
      </p>
    </div>
  );
}

export default Summary;
