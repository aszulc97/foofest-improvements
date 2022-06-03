import { useState } from "react";
import Nav from "../components/Nav";
import Toggle from "../components/Toggle";
import FAQ from "../components/FAQ";
import AccomodationInfo from "../components/AccomodationInfo";
import Footer from "../components/Footer";

export default function Info(props) {
  const [toggle, setToggle] = useState(false);

  function toggleSwitch() {
    setToggle((state) => !state);
  }

  return (
    <div>
      <Nav vipCount={props.vipCount} regularCount={props.regularCount} />
      <h1>INFORMATION</h1>
      <Toggle toggleSwitchFunction={toggleSwitch} />
      {!toggle ? <AccomodationInfo /> : <FAQ />}
      <Footer />
    </div>
  );
}
