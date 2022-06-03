import AvailableSpots from "../components/AvailableSpots";
import Nav from "../components/Nav";
import TicketCard from "../components/TicketCard";
import Summary from "../components/Summary";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useEffect } from "react";
export default function Tickets(props) {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const { checkIfSoldout } = props;

  useEffect(() => {
    checkIfSoldout();
  }, [checkIfSoldout]);

  return (
    <>
      <div>
        <Nav vipCount={props.vipCount} regularCount={props.regularCount} />
      </div>
      <h1>CHOOSE YOUR TICKETS</h1>
      {props.soldout && <p className="soldout">NO MORE TICKETS AVAILABLE</p>}
      <div className="ticketsBox">
        <TicketCard
          title="VIP"
          description="Camping spot;All stages;7 days;VIP backstage entrance;Breakfast"
          price={props.vipPrice + "kr"}
          amount="choose the amount of VIP tickets"
          count={props.vipCount}
          incrementCount={props.incrementCount}
          decrementCount={props.decrementCount}
          soldout={props.soldout}
        />
        <TicketCard
          title="REGULAR"
          description="Camping spot;All stages;7 days"
          price={props.regularPrice + "kr"}
          amount="choose the amount of Regular tickets"
          count={props.regularCount}
          incrementCount={props.incrementCount}
          decrementCount={props.decrementCount}
          soldout={props.soldout}
        />
      </div>
      {!(props.vipCount === 0 && props.regularCount === 0) && (
        // !(props.vipCount === 0 && props.regularCount === 0)
        // &&
        <aside
          className="ticketsSummary"
          // style={props.vipCount || props.regularCount < 1 ? { display: "none" } : null}
        >
          <Summary
            vipCount={props.vipCount}
            regularCount={props.regularCount}
            vipPrice={props.vipPrice}
            regularPrice={props.regularPrice}
            twoPeopleTent={props.twoPeopleTent}
            threePeopleTent={props.threePeopleTent}
            greenCampChange={props.greenCampChange}
            greenCampingPrice={props.greenCampingPrice}
            twoPeopleTentPrice={props.twoPeopleTentPrice}
            threePeopleTentPrice={props.threePeopleTentPrice}
          />
          <Link to="/basket" className="primaryCTA">
            Add to cart
          </Link>
        </aside>
      )}
      <h3 className="campingAvailability">Check our camping availability</h3>
      <table>
        <thead>
          <tr>
            <th>Camping Site</th>
            <th>Total spots</th>
            <th>Spots available</th>
          </tr>
        </thead>

        <tbody>
          {props.availableSpots.map((availableSpot) => (
            <tr key={availableSpot.area} style={availableSpot.available < 1 ? { opacity: "0.5" } : null}>
              <AvailableSpots availableSpot={availableSpot} />
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/info" className="readMore link" onClick={scrollToTop}>
        Read more about our camping sites
      </Link>
      <Footer />
    </>
  );
}
