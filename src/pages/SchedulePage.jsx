import Nav from "../components/Nav";
import { useState, useEffect, useRef } from "react";
import BandCard from "../components/BandCard";
import BandPopUp from "../components/BandPopUp";
import Footer from "../components/Footer";
import RadioButton from "../components/RadioButton";
import Schedule from "../components/Schedule";

export default function SchedulePage(props) {
  const [midgard, setMidgard] = useState({});
  const [vanaheim, setVanaheim] = useState({});
  const [jotunheim, setJotunheim] = useState({});
  const [displayedJ, setDisplayedJ] = useState([]);
  const [displayedM, setDisplayedM] = useState([]);
  const [displayedV, setDisplayedV] = useState([]);
  const [hideM, setHideM] = useState(false);
  const [hideV, setHideV] = useState(false);
  const [hideJ, setHideJ] = useState(false);
  const [hideSchedules, setHideSchedules] = useState(true);
  const [hiddenPopUp, setHiddenPopUp] = useState(true);
  const [popUpBand, setPopUpBand] = useState({});
  const [hideInfo, setHideInfo] = useState(false);

  const daysButtons = useRef();
  const stagesButtons = useRef();

  useEffect(() => {
    fetch("https://foofest2022.herokuapp.com/schedule")
      .then((response) => response.json())
      .then((data) => {
        setMidgard(data.Midgard);
        setVanaheim(data.Vanaheim);
        setJotunheim(data.Jotunheim);
      });
    // daysButtons.current.elements["dayall"].checked = true;
    stagesButtons.current.elements["stageall"].checked = true;
    filterByStage("all");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function filterByDay(day) {
    if (day === "all") {
      setHideSchedules(true);
      let alldays = [];
      Object.keys(midgard).map((key) => midgard[key].map((item) => alldays.push(item)));
      setDisplayedM(alldays);
      alldays = [];
      Object.keys(vanaheim).map((key) => vanaheim[key].map((item) => alldays.push(item)));
      setDisplayedV(alldays);
      alldays = [];
      Object.keys(jotunheim).map((key) => jotunheim[key].map((item) => alldays.push(item)));
      setDisplayedJ(alldays);
      setHideInfo(false);
    } else {
      setHideSchedules(false);
      setDisplayedJ(jotunheim[day]);
      setDisplayedM(midgard[day]);
      setDisplayedV(vanaheim[day]);
      setHideInfo(true);
    }
  }

  function filterByStage(stage) {
    if (stage === "midgard") {
      setHideM(false);
      setHideV(true);
      setHideJ(true);
    } else if (stage === "vanaheim") {
      setHideM(true);
      setHideV(false);
      setHideJ(true);
    } else if (stage === "jotunheim") {
      setHideM(true);
      setHideV(true);
      setHideJ(false);
    } else {
      setHideM(false);
      setHideV(false);
      setHideJ(false);
    }
  }

  function showPopup(props) {
    setHiddenPopUp(false);
    setPopUpBand(props);
  }

  function hidePopUp() {
    setHiddenPopUp(true);
  }

  function handleDaysDropdownChange(evt) {
    filterByDay(evt.target.options[evt.target.selectedIndex].value);
  }

  function handleStagesDropdownChange(evt) {
    filterByStage(evt.target.options[evt.target.selectedIndex].value);
  }

  return (
    <div>
      <Nav vipCount={props.vipCount} regularCount={props.regularCount} />
      <h1>SCHEDULE</h1>
      {!hideInfo && <p className="styledPar">Choose a day to see schedules</p>}
      <div className="scheduleButtons">
        <form className="daysButtons" ref={daysButtons}>
          <RadioButton
            number={"all"}
            name={"day"}
            value={"all"}
            filterFunction={filterByDay}
            labelTop={"ALL"}
            labelBottom={"DAYS"}
          />
          <div className="daysContainer">
            <RadioButton
              number={"1"}
              name={"day"}
              value={"mon"}
              filterFunction={filterByDay}
              labelTop={"Day 1"}
              labelBottom={"(10/07)"}
            />
            <RadioButton
              number={"2"}
              name={"day"}
              value={"tue"}
              filterFunction={filterByDay}
              labelTop={"Day 2"}
              labelBottom={"(11/07)"}
            />
            <RadioButton
              number={"3"}
              name={"day"}
              value={"wed"}
              filterFunction={filterByDay}
              labelTop={"Day 3"}
              labelBottom={"(12/07)"}
            />
            <RadioButton
              number={"4"}
              name={"day"}
              value={"thu"}
              filterFunction={filterByDay}
              labelTop={"Day 4"}
              labelBottom={"(13/07)"}
            />
            <RadioButton
              number={"5"}
              name={"day"}
              value={"fri"}
              filterFunction={filterByDay}
              labelTop={"Day 5"}
              labelBottom={"(14/07)"}
            />
            <RadioButton
              number={"6"}
              name={"day"}
              value={"sat"}
              filterFunction={filterByDay}
              labelTop={"Day 6"}
              labelBottom={"(15/07)"}
            />
            <RadioButton
              number={"7"}
              name={"day"}
              value={"sun"}
              filterFunction={filterByDay}
              labelTop={"Day 7"}
              labelBottom={"(16/07)"}
            />
          </div>
        </form>
        <form className="stagesButtons" ref={stagesButtons}>
          <RadioButton
            number={"all"}
            name={"stage"}
            value={"all"}
            filterFunction={filterByStage}
            labelTop={"ALL"}
            labelBottom={"STAGES"}
          />
          <RadioButton
            number={"1"}
            name={"stage"}
            value={"midgard"}
            filterFunction={filterByStage}
            labelTop={"Stage 1"}
            labelBottom={"MIDGARD"}
            color="#e4a3c8"
          />
          <RadioButton
            number={"2"}
            name={"stage"}
            value={"vanaheim"}
            filterFunction={filterByStage}
            labelTop={"Stage 2"}
            labelBottom={"VANAHEIM"}
            color="#7cc7cf"
          />
          <RadioButton
            number={"3"}
            name={"stage"}
            value={"jotunheim"}
            filterFunction={filterByStage}
            labelTop={"Stage 3"}
            labelBottom={"JOTUNHEIM"}
            color="#ffad7d"
          />
        </form>

        <select name="day" id="daysDropdown" onChange={handleDaysDropdownChange}>
          <option value="all">All days</option>
          <option value="mon">Day 1 (10/07)</option>
          <option value="tue">Day 2 (11/07)</option>
          <option value="wed">Day 3 (12/07)</option>
          <option value="thu">Day 4 (13/07)</option>
          <option value="fri">Day 5 (14/07)</option>
          <option value="say">Day 6 (15/07)</option>
          <option value="sun">Day 7 (16/07)</option>
        </select>
        <select name="stage" id="stagesDropdown" onChange={handleStagesDropdownChange}>
          <option value="all">All stages</option>
          <option value="midgard">Stage 1 MIDGARD</option>
          <option value="vanaheim">Stage 2 VANAHEIM</option>
          <option value="jotunheim">Stage 3 JOTUNHEIM</option>
        </select>
      </div>
      <div className="schedules">
        {!hideM && !hideSchedules && (
          <Schedule
            bands={props.bands}
            displayed={displayedM}
            showPopup={showPopup}
            stageNumber="1"
            stageName="MIDGARD"
            color="#e4a3c8"
          ></Schedule>
        )}
        {!hideV && !hideSchedules && (
          <Schedule
            bands={props.bands}
            displayed={displayedV}
            showPopup={showPopup}
            stageNumber="2"
            stageName="VANAHEIM"
            color="#7cc7cf"
          ></Schedule>
        )}
        {!hideJ && !hideSchedules && (
          <Schedule
            bands={props.bands}
            displayed={displayedJ}
            showPopup={showPopup}
            stageNumber="3"
            stageName="JOTUNHEIM"
            color="#ffad7d"
          ></Schedule>
        )}
      </div>

      {/* artists list */}
      <div className="artistsList">
        {!hideM && (
          <>
            {displayedM.map((item) =>
              item.act !== "break" ? (
                <BandCard
                  key={item.act}
                  stage={"midgard"}
                  showPopUpFunction={showPopup}
                  band={props.bands.find((band) => band.name === item.act)}
                />
              ) : null
            )}
          </>
        )}
        {!hideV && (
          <>
            {displayedV.map((item) =>
              item.act !== "break" ? (
                <BandCard
                  key={item.act}
                  stage={"vanaheim"}
                  showPopUpFunction={showPopup}
                  band={props.bands.find((band) => band.name === item.act)}
                />
              ) : null
            )}
          </>
        )}
        {!hideJ && (
          <>
            {displayedJ.map((item) =>
              item.act !== "break" ? (
                <BandCard
                  key={item.act}
                  stage={"jotunheim"}
                  showPopUpFunction={showPopup}
                  band={props.bands.find((band) => band.name === item.act)}
                />
              ) : null
            )}
          </>
        )}
      </div>
      {!hiddenPopUp && <BandPopUp band={popUpBand} hidePopUp={hidePopUp} />}

      <Footer />
    </div>
  );
}
