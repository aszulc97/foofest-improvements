import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./sass/App.scss";
import Home from "./pages/Home";
import Tickets from "./pages/Tickets";
import SchedulePage from "./pages/SchedulePage";
import Info from "./pages/Info";
import Basket from "./pages/Basket";

function App() {
  const [bands, setBands] = useState([]);
  const [availableSpots, setAvailableSpots] = useState([]);
  const [soldout, setSoldout] = useState(false);
  useEffect(() => {
    async function getData() {
      const res = await fetch("https://foofest2022.herokuapp.com/bands");
      const res2 = await fetch("https://foofest2022.herokuapp.com/available-spots");
      const data = await res.json();
      const data2 = await res2.json();
      setBands(data);
      setAvailableSpots(data2);
    }
    getData();
  }, []);

  function checkIfSoldout() {
    let spots = 0;
    availableSpots.forEach((area) => {
      spots = spots + area.available;
    });
    if (spots === vipCount + regularCount) {
      setSoldout(true);
    } else setSoldout(false);
  }

  function fetchAvailableSpots(data) {
    setAvailableSpots(data);
  }

  const vipPrice = 1299;
  const regularPrice = 799;
  let [vipCount, setVipCount] = useState(0);
  let [regularCount, setRegularCount] = useState(0);
  const [twoPeopleTent, setTwoPeopleTent] = useState(0);
  const [threePeopleTent, setThreePeopleTent] = useState(0);
  const [greenCampingPrice, setGreenCampingPrice] = useState(0);
  const twoPeopleTentPrice = 299;
  const threePeopleTentPrice = 399;
  function incrementCount(countType) {
    if (countType === "VIP") {
      setVipCount((old) => old + 1);
    } else if (countType === "REGULAR") {
      setRegularCount((old) => old + 1);
    } else if (countType === "TWOTENT") {
      setTwoPeopleTent((old) => old + 1);
    } else if (countType === "THREETENT") {
      setThreePeopleTent((old) => old + 1);
    }
  }
  function decrementCount(countType) {
    if (countType === "VIP") {
      setVipCount((old) => old - 1);
    } else if (countType === "REGULAR") {
      setRegularCount((old) => old - 1);
    } else if (countType === "TWOTENT") {
      setTwoPeopleTent((old) => old - 1);
    } else if (countType === "THREETENT") {
      setThreePeopleTent((old) => old - 1);
    }
  }

  function greenCampChange() {
    if (greenCampingPrice === 0) setGreenCampingPrice(249);
    else {
      setGreenCampingPrice(0);
    }
  }
  function resetTents() {
    setTwoPeopleTent(0);
    setThreePeopleTent(0);
  }

  function resetTickets() {
    setVipCount(0);
    setRegularCount(0);
  }

  function resetVipTicket() {
    setVipCount(0);
  }
  function resetRegularTicket() {
    setRegularCount(0);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home bands={bands} />} />
        <Route
          path="/tickets"
          element={
            <Tickets
              availableSpots={availableSpots}
              vipPrice={vipPrice}
              regularPrice={regularPrice}
              vipCount={vipCount}
              regularCount={regularCount}
              incrementCount={incrementCount}
              decrementCount={decrementCount}
              twoPeopleTent={twoPeopleTent}
              threePeopleTent={threePeopleTent}
              greenCampingPrice={greenCampingPrice}
              greenCampChange={greenCampChange}
              twoPeopleTentPrice={twoPeopleTentPrice}
              threePeopleTentPrice={threePeopleTentPrice}
              soldout={soldout}
              checkIfSoldout={checkIfSoldout}
            />
          }
        />
        <Route path="/schedule" element={<SchedulePage bands={bands} regularCount={regularCount} vipCount={vipCount} />} />
        <Route path="/info" element={<Info regularCount={regularCount} vipCount={vipCount} />} />
        <Route
          path="/basket"
          element={
            <Basket
              availableSpots={availableSpots}
              vipCount={vipCount}
              regularCount={regularCount}
              vipPrice={vipPrice}
              regularPrice={regularPrice}
              incrementCount={incrementCount}
              decrementCount={decrementCount}
              resetTickets={resetTickets}
              resetVipTicket={resetVipTicket}
              resetRegularTicket={resetRegularTicket}
              twoPeopleTent={twoPeopleTent}
              threePeopleTent={threePeopleTent}
              resetTents={resetTents}
              greenCampingPrice={greenCampingPrice}
              greenCampChange={greenCampChange}
              twoPeopleTentPrice={twoPeopleTentPrice}
              threePeopleTentPrice={threePeopleTentPrice}
              fetchAvailableSpots={fetchAvailableSpots}
              soldout={soldout}
              checkIfSoldout={checkIfSoldout}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
