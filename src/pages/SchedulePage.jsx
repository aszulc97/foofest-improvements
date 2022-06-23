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
  const [searchInput, setSearchInput] = useState("");

  function handleSearch(e) {
    setSearchInput(e.target.value.toLowerCase());
  }

  const filteredM = displayedM.filter((el) => {
    if (searchInput === "") return el;
    else return el.act !== "break" ? el.act.toLowerCase().includes(searchInput) : null;
  });

  const filteredV = displayedV.filter((el) => {
    if (searchInput === "") return el;
    else return el.act !== "break" ? el.act.toLowerCase().includes(searchInput) : null;
  });

  const filteredJ = displayedJ.filter((el) => {
    if (searchInput === "") return el;
    else return el.act !== "break" ? el.act.toLowerCase().includes(searchInput) : null;
  });

  useEffect(() => {
    if (filteredM.length === 0) setHideM(true);
    else setHideM(false);
    if (filteredV.length === 0) setHideV(true);
    else setHideV(false);
    if (filteredJ.length === 0) setHideJ(true);
    else setHideJ(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput, displayedM, displayedV, displayedJ]);

  const daysButtons = useRef();
  const stagesButtons = useRef();

  useEffect(() => {
    fetch("https://foofest2022.herokuapp.com/schedule")
      .then((response) => response.json())
      .then((data) => {
        let temp = [];
        Object.keys(data.Midgard).map((key) =>
          data.Midgard[key].map((item) => {
            let pair = { day: key };
            return temp.push({ ...item, ...pair });
          })
        );
        setMidgard(temp);

        temp = [];
        Object.keys(data.Vanaheim).map((key) =>
          data.Vanaheim[key].map((item) => {
            let pair = { day: key };
            return temp.push({ ...item, ...pair });
          })
        );
        setVanaheim(temp);

        temp = [];
        Object.keys(data.Jotunheim).map((key) =>
          data.Jotunheim[key].map((item) => {
            let pair = { day: key };
            return temp.push({ ...item, ...pair });
          })
        );
        setJotunheim(temp);
      });
    stagesButtons.current.elements["stageall"].checked = true;
    filterByStage("all");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function filterByDay(day) {
    if (day === "all") {
      setHideSchedules(true);
      setDisplayedM(midgard);
      setDisplayedV(vanaheim);
      setDisplayedJ(jotunheim);
      setHideInfo(false);
    } else {
      setHideSchedules(false);
      setDisplayedM(midgard.filter((item) => item.day === day));
      setDisplayedV(vanaheim.filter((item) => item.day === day));
      setDisplayedJ(jotunheim.filter((item) => item.day === day));
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
        <div className="search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
          <input type="text" onChange={handleSearch} placeholder="Search " />
        </div>
      </div>

      <div className="schedules">
        {!hideM && !hideSchedules && (
          <Schedule
            bands={props.bands}
            displayed={displayedM}
            showPopup={showPopup}
            stageNumber="1"
            stageName="midgard"
            color="#e4a3c8"
            searchInput={searchInput}
          ></Schedule>
        )}
        {!hideV && !hideSchedules && (
          <Schedule
            bands={props.bands}
            displayed={displayedV}
            showPopup={showPopup}
            stageNumber="2"
            stageName="vanaheim"
            color="#7cc7cf"
            searchInput={searchInput}
          ></Schedule>
        )}
        {!hideJ && !hideSchedules && (
          <Schedule
            bands={props.bands}
            displayed={displayedJ}
            showPopup={showPopup}
            stageNumber="3"
            stageName="jotunheim"
            color="#ffad7d"
            searchInput={searchInput}
          ></Schedule>
        )}
      </div>

      {/* artists list */}
      <div className="artistsList">
        {!hideM && (
          <>
            {filteredM.map((item) =>
              item.act !== "break" ? (
                <BandCard
                  key={item.act}
                  stage={"midgard"}
                  time={item.start}
                  day={item.day}
                  showPopUpFunction={showPopup}
                  band={props.bands.find((band) => band.name === item.act)}
                />
              ) : null
            )}
          </>
        )}
        {!hideV && (
          <>
            {filteredV.map((item) =>
              item.act !== "break" ? (
                <BandCard
                  key={item.act}
                  stage={"vanaheim"}
                  time={item.start}
                  day={item.day}
                  showPopUpFunction={showPopup}
                  band={props.bands.find((band) => band.name === item.act)}
                />
              ) : null
            )}
          </>
        )}
        {!hideJ && (
          <>
            {filteredJ.map((item) =>
              item.act !== "break" ? (
                <BandCard
                  key={item.act}
                  stage={"jotunheim"}
                  time={item.start}
                  day={item.day}
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
