import Campsite from "./Campsite";
import svartheim from "../sass/svartheim.webp";
import nilfheim from "../sass/nilfheim.webp";
import helheim from "../sass/helheim.webp";
import muspelheim from "../sass/muspelheim.webp";
import alfheim from "../sass/alfheim.webp";

export default function AccomodationInfo() {
  return (
    <div>
      <h2>Our campsites:</h2>
      <Campsite
        name={"Svartheim"}
        img={svartheim}
        desc={"Cloakrooms;Showers both cold (free) and warm;Toilet facilities"}
      ></Campsite>
      <Campsite
        name={"Nilfheim"}
        img={nilfheim}
        desc={
          "Closest to the stages;A great number of food stalls around the campsite;Shopping facilities including camping gear, groceries, pharmacies and a whole bunch of fun festival accessories;Cloakrooms;Showers both cold (free) and warm;Toilet facilities"
        }
      ></Campsite>
      <Campsite
        name={"Helheim"}
        img={helheim}
        desc={"Cloakrooms;Showers both cold (free) and warm;Toilet facilities"}
      ></Campsite>
      <Campsite
        name={"Muspelheim"}
        img={muspelheim}
        desc={
          "A great number of food stalls around the campsite;Shopping facilities including camping gear, groceries, pharmacies and a whole bunch of fun festival accessories;Cloakrooms;Showers both cold (free) and warm;Toilet facilities"
        }
      ></Campsite>
      <Campsite
        name={"Alfheim"}
        img={alfheim}
        desc={"Showers both cold (free) and warm;Toilet facilities"}
      ></Campsite>
    </div>
  );
}
