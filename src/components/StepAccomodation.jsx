import AvailableSpots from "./AvailableSpots";
import CountTicket from "./CountTicket";
import { useState, useEffect } from "react";

function StepAccomodation(props) {
  const { twoPeopleTent, threePeopleTent, vipCount, regularCount, disableNextStep, ownTent, selectedArea } = props;
  const [peopleEqual, setPeopleEqual] = useState(false);

  useEffect(() => {
    if (selectedArea !== "") disableNextStep(ownTent);
  }, [ownTent, disableNextStep, selectedArea]);

  function ownTentChange() {
    props.setOwnTent((oldvalue) => !oldvalue);
    props.resetTents();
    props.disableNextStep(props.ownTent);
  }

  useEffect(() => {
    if (!props.ownTent) {
      if (twoPeopleTent * 2 + threePeopleTent * 3 === vipCount + regularCount) {
        if (selectedArea !== "") disableNextStep(true);
        setPeopleEqual(true);
      } else {
        setPeopleEqual(false);
        disableNextStep(false);
      }
    }
  }, [props.ownTent, twoPeopleTent, threePeopleTent, disableNextStep, vipCount, regularCount, selectedArea]);

  function handleAreaChange(evt) {
    props.getArea(evt.target.value);
  }
  return (
    <>
      <h4 className="stepTitle">Choose accomodation{props.count}</h4>
      <p>Choose one of the following campsites:</p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Camping Site</th>
            <th>Total spots</th>
            <th>Spots available</th>
          </tr>
        </thead>
        <tbody>
          {props.availableSpots.map((availableSpot) => (
            <tr key={availableSpot.area} style={availableSpot.available < vipCount + regularCount ? { opacity: "0.6" } : null}>
              <td id="radioCampsites">
                <input
                  type="radio"
                  name="campsites"
                  value={availableSpot.area}
                  onChange={handleAreaChange}
                  disabled={availableSpot.available < vipCount + regularCount}
                  required
                ></input>
              </td>
              <AvailableSpots availableSpot={availableSpot} />
            </tr>
          ))}
        </tbody>
      </table>
      {selectedArea === "" && <p className="accomodationFeedback">*Choose a campsite</p>}
      <h4>Tents</h4>
      <div className="marginBottom">
        <div className="chooseTentContainer">
          <CountTicket
            count={props.twoPeopleTent}
            incrementCount={props.incrementCount}
            decrementCount={props.decrementCount}
            title="TWOTENT"
            ownTent={props.ownTent}
          />
          <p>2 person tent</p>
          <p>{props.twoPeopleTentPrice}kr</p>
        </div>
        <div className="chooseTentContainer">
          <CountTicket
            count={props.threePeopleTent}
            incrementCount={props.incrementCount}
            decrementCount={props.decrementCount}
            title="THREETENT"
            priceThreeTent={props.threePeopleTentPrice}
            ownTent={props.ownTent}
          />
          <p>3 person tent</p>
          <p>{props.threePeopleTentPrice}kr</p>
        </div>
      </div>

      {!peopleEqual && (
        <p className="accomodationFeedback">*Amount of people in the tents should be equal to the amount of tickets!</p>
      )}
      <div>
        <input type="checkbox" onChange={ownTentChange} id="ownTentCheck"></input>
        <label htmlFor="ownTentCheck">I have my own tent</label>
      </div>
      <div>
        <input type="checkbox" onChange={props.greenCampChange} id="greenOptionCheck"></input>
        <label htmlFor="greenOptionCheck">Green Camping Option 249kr</label>
      </div>
    </>
  );
}

export default StepAccomodation;
