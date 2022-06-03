import Nav from "../components/Nav";
import StepItem from "../components/StepItem";
import StepTickets from "../components/StepTickets";
import StepAccomodation from "../components/StepAccomodation";
import StepPersonalData from "../components/StepPersonalData";
import StepPayment from "../components/StepPayment";
import Summary from "../components/Summary";
import Footer from "../components/Footer";
import { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Link } from "react-router-dom";

function Basket(props) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [stepCounter, setStepCounter] = useState(1);
  const [email, setEmail] = useState("");
  const [ticketOwners, setTicketOwners] = useState([]);
  const [reservationID, setReservationID] = useState("");
  const [ownTent, setOwnTent] = useState(false);
  const [selectedArea, setSelectedArea] = useState("");

  function getArea(area) {
    setSelectedArea(area);
  }

  function getEmail(e) {
    setEmail(e.target.value.toLowerCase());
  }

  function getTicketOwners(e) {
    setTicketOwners(e);
  }
  const apikey = "62949817c4d5c3756d35a345";
  //POST
  function postData() {
    const personalData = {
      email: email,
      ticketOwners: ticketOwners,
      numberOfTickets: props.vipCount + props.regularCount,
      numberOfTents: props.twoPeopleTent + props.threePeopleTent,
      ownTent: ownTent,
      green: props.greenCampingPrice,
      reservationID: reservationID,
    };
    fetch("https://mydogs-0e30.restdb.io/rest/foofest2022", {
      method: "POST",
      headers: {
        "x-apikey": apikey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(personalData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        finalizeReservation();
      });
  }

  function finalizeReservation() {
    const idObj = {
      id: reservationID,
    };
    fetch("https://foofest2022.herokuapp.com/fullfill-reservation", {
      headers: { "Content-Type": "application/json" },
      method: "post",
      body: JSON.stringify(idObj),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  function showNextStep() {
    setStepCounter((old) => old + 1);
    stepCounter === 4 ? setIsDisabled(true) : setIsDisabled(false);
    if (stepCounter === 2) {
      let ticketTotal = props.vipCount + props.regularCount;
      const obj = {
        area: selectedArea,
        amount: ticketTotal,
      };

      fetch("https://foofest2022.herokuapp.com/reserve-spot", {
        headers: { "Content-Type": "application/json" },
        method: "put",
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((data) => setReservationID(data.id));
    }

    if (stepCounter === 4) {
      postData();
      props.resetTickets();
      props.resetTents();
      refetchSpots();
    }
  }

  function fetchAvailableSpots(data) {
    props.fetchAvailableSpots(data);
  }

  function refetchSpots() {
    fetch("https://foofest2022.herokuapp.com/available-spots")
      .then((res) => res.json())
      .then((data) => fetchAvailableSpots(data));
  }

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      props.resetTickets();
    }

    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
        <div className="text">sec</div>
      </div>
    );
  };

  function disableNextStep(state) {
    setIsDisabled(!state);
  }
  return (
    <div className="basketPageContainer">
      <Nav vipCount={props.vipCount} regularCount={props.regularCount} />
      {stepCounter < 5 && (
        <div className="timer-wrapper">
          <p>Your purchase will expire in:</p>
          <CountdownCircleTimer
            isPlaying
            duration={300}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[15, 10, 5, 0]}
            onComplete={() => ({ shouldRepeat: false })}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
      )}
      <main className="basketContainer">
        <ul>
          <StepItem stepNumber={1} name="Tickets" count={stepCounter} />
          <StepItem stepNumber={2} name="Accomodation" count={stepCounter} />
          <StepItem stepNumber={3} name="Personal Data" count={stepCounter} />
          <StepItem stepNumber={4} name="Payment" count={stepCounter} />
        </ul>

        <section>
          <div>
            {stepCounter === 1 ? (
              <StepTickets
                vipCount={props.vipCount}
                regularCount={props.regularCount}
                vipPrice={props.vipPrice}
                regularPrice={props.regularPrice}
                incrementCount={props.incrementCount}
                decrementCount={props.decrementCount}
                resetVipTicket={props.resetVipTicket}
                resetRegularTicket={props.resetRegularTicket}
                soldout={props.soldout}
                checkIfSoldout={props.checkIfSoldout}
              />
            ) : null}
            {stepCounter === 2 ? (
              <StepAccomodation
                vipCount={props.vipCount}
                regularCount={props.regularCount}
                stepCounter={stepCounter}
                availableSpots={props.availableSpots}
                twoPeopleTent={props.twoPeopleTent}
                threePeopleTent={props.threePeopleTent}
                incrementCount={props.incrementCount}
                decrementCount={props.decrementCount}
                twoPeopleTentPrice={props.twoPeopleTentPrice}
                threePeopleTentPrice={props.threePeopleTentPrice}
                resetTents={props.resetTents}
                greenCampChange={props.greenCampChange}
                greenCampingPrice={props.greenCampingPrice}
                disableNextStep={disableNextStep}
                getArea={getArea}
                ownTent={ownTent}
                setOwnTent={setOwnTent}
                selectedArea={selectedArea}
              />
            ) : null}
            {stepCounter === 3 ? (
              <StepPersonalData
                stepCounter={stepCounter}
                vipCount={props.vipCount}
                regularCount={props.regularCount}
                email={email}
                ticketOwners={ticketOwners}
                getEmail={getEmail}
                getTicketOwners={getTicketOwners}
                disableNextStep={disableNextStep}
              />
            ) : null}
            {stepCounter === 4 ? <StepPayment stepCounter={stepCounter} disableNextStep={disableNextStep} /> : null}
            {!(props.vipCount === 0 && props.regularCount === 0) && stepCounter < 5 && (
              <button onClick={showNextStep} disabled={isDisabled} className="primaryCTA">
                {stepCounter === 4 ? "Confirm & pay" : "Next step"}
              </button>
            )}
          </div>
          {stepCounter < 5 ? (
            <aside>
              {!(props.vipCount === 0 && props.regularCount === 0) && (
                <Summary
                  vipCount={props.vipCount}
                  regularCount={props.regularCount}
                  vipPrice={props.vipPrice}
                  regularPrice={props.regularPrice}
                  twoPeopleTentPrice={props.twoPeopleTentPrice}
                  threePeopleTentPrice={props.threePeopleTentPrice}
                  twoPeopleTent={props.twoPeopleTent}
                  threePeopleTent={props.threePeopleTent}
                  greenCampingPrice={props.greenCampingPrice}
                />
              )}
            </aside>
          ) : null}
        </section>
        {/* thank you page */}
        {stepCounter === 5 && (
          <div className="thankyou">
            <h2>Thank you for your order</h2>
            <p>Your tickets have been sent to {email}</p>
            <Link to="/" className="link">
              Click here to go back to home page
            </Link>
            <Link to="/schedule" className="link">
              Click here to check out the bands playing on FOOFEST 2022
            </Link>
            <h3>We can’t wait to see you at FOOFEST 2022!</h3>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Basket;
