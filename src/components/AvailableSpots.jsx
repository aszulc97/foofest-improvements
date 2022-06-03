import React from "react";

function AvailableSpots(props) {
  return (
    <>
      <td>{props.availableSpot.area}</td>
      <td>{props.availableSpot.spots}</td>
      <td>{props.availableSpot.available}</td>
    </>
  );
}
export default AvailableSpots;
