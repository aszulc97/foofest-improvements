import { Link } from "react-router-dom";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Band from "../components/Band";
import Footer from "../components/Footer";
import PrimaryCTA from "../components/PrimaryCTA";
import { useEffect, useState } from "react";

export default function Home(props) {
  const [fortyBands, setFortyBands] = useState([]);
  useEffect(() => {
    let shuffled = props.bands.slice(11).sort(function () {
      return 0.5 - Math.random();
    });
    setFortyBands(shuffled.slice(0, 40));
  }, [props.bands, setFortyBands]);

  return (
    <>
      <div id="welcomeImageBackground">
        <div className="opacityContainer">
          <nav>
            <ul>
              <Link className="logo" to="/">
                FOOFEST
              </Link>
              <div className="navFlexWrapper">
                <li>
                  <Link to="/tickets">TICKETS</Link>
                </li>
                <li>
                  <Link to="/schedule">SCHEDULE</Link>
                </li>
                <li>
                  <Link to="/info">INFO</Link>
                </li>
              </div>
              <li>
                <PrimaryCTA />
              </li>
            </ul>
          </nav>
          <Header />
        </div>
      </div>
      <h1 className="homeTitle">THE BIGGEST BEACH FESTIVAL IN EUROPE 2022</h1>
      <p>
        Come and join us to celebrate our 2nd edition of FooFest - beach music festival where fun is
        guaranteed. You can expect great music, summer beach vibes, mixed coctails and much more.
      </p>
      <Banner
        title="Get your ticket now!"
        name="/tickets"
        buttonText="Buy Tickets"
        style={{ backgroundPosition: "top" }}
      />
      <Banner
        title="Check out the artists playing!"
        name="/schedule"
        buttonText="Schedule"
        bgColor={{ backgroundColor: "#2F5061" }}
      />
      <section className="lineupContainer">
        <h2>Line-up</h2>

        <p className="defaultLineup">
          TERMINALIST * LED ZEPPELIN * THE BEATLES * PINK FLOYD * QUEEN * METALLICA * AC/DC * THE
          ROLLING STONES * GUNS N' ROSES * NIRVANA
        </p>
        <div className="lineupBand">
          {fortyBands.map((band) => (
            <Band key={band.name} band={band} />
          ))}
        </div>
        <p className="andMoreLineup">AND MANY MORE!</p>
      </section>
      <Footer />
    </>
  );
}
