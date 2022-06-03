import { useEffect, useRef, useState } from "react";
import TicketOwner from "./TicketOwner";

function StepPersonalData(props) {
  const [isEmailTheSame, setIsEmailTheSame] = useState(false);
  const [repeatedEmail, setRepeatedEmail] = useState("");

  function addToArray(owner) {
    let noId = props.ticketOwners.filter((el) => el.id !== owner.id); //remove duplicated ids
    props.getTicketOwners(noId.concat(owner));
  }

  function handleEmail(e) {
    props.getEmail(e);
  }

  function handleRepeat(e) {
    setRepeatedEmail(e.target.value.toLowerCase());
  }

  const { email } = props;

  useEffect(() => {
    function validateEmail() {
      if (repeatedEmail === email) {
        setIsEmailTheSame(true);
      } else setIsEmailTheSame(false);
    }
    validateEmail();
  }, [repeatedEmail, email]);

  useEffect(() => {
    props.disableNextStep(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataForm = useRef();

  function checkValidity(e) {
    if (isEmailTheSame) {
      if (e.target.checkValidity()) {
        let sum = 0;
        for (const element of dataForm.current.elements) {
          if (element.checkValidity()) sum++;
        }
        if (sum < dataForm.current.elements.length) {
          props.disableNextStep(false);
        } else props.disableNextStep(true);
      } else props.disableNextStep(false);
    } else props.disableNextStep(false);
  }

  return (
    <>
      <h4 className="stepTitle">Contact information</h4>
      <form className="personalData" onChange={checkValidity} ref={dataForm}>
        <fieldset>
          <legend>Where to send tickets</legend>
          <div>
            <label htmlFor="email">Your email</label>
            <div className="flex">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email"
                required
                email={props.email}
                onChange={handleEmail}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
              />
              <span></span>
            </div>
          </div>
          <div>
            {!isEmailTheSame && props.email !== "" && <p className="noMatch">Emails are not matching!</p>}
            <label htmlFor="email">Repeat your email</label>
            <div className="flex">
              <input
                type="text"
                id="repeatEmail"
                name="repeatEmail"
                placeholder="email"
                required
                onChange={handleRepeat}
                onPaste={(e) => e.preventDefault()}
              />
              <span></span>
            </div>
          </div>
        </fieldset>

        {[...Array(props.vipCount + props.regularCount)].map((e, i) => (
          <TicketOwner key={i} i={i} addToArray={addToArray}></TicketOwner>
        ))}
      </form>
    </>
  );
}

export default StepPersonalData;
