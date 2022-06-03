import "../card.css";
import CardReactFormContainer from "card-react";
import { useRef, useEffect } from "react";
function StepPayment(props) {
  const payForm = useRef();

  useEffect(() => {
    props.disableNextStep(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkValidity(e) {
    if (e.target.checkValidity()) {
      let sum = 0;
      for (const element of payForm.current.elements) {
        if (element.checkValidity()) sum++;
      }
      if (sum < payForm.current.elements.length) {
        props.disableNextStep(false);
      } else props.disableNextStep(true);
    } else props.disableNextStep(false);
  }

  return (
    <>
      <h4 className="stepTitle">Payment method{props.count}</h4>
      <CardReactFormContainer
        // the id of the container element where you want to render the card element.
        // the card component can be rendered anywhere (doesn't have to be in ReactCardFormContainer).
        container="card-wrapper" // required
        // an object contain the form inputs names.
        // every input must have a unique name prop.
        formInputsNames={{
          number: "CCnumber", // optional — default "number"
          expiry: "CCexpiry", // optional — default "expiry"
          cvc: "CCcvc", // optional — default "cvc"
          name: "CCname", // optional - default "name"
        }}
        // the class name attribute to add to the input field and the corresponding part of the card element,
        // when the input is valid/invalid.
        classes={{
          valid: "valid-input", // optional — default 'jp-card-valid'
          invalid: "invalid-input", // optional — default 'jp-card-invalid'
        }}
        // specify whether you want to format the form inputs or not
        formatting={true} // optional - default true
      >
        <form className="personalData" onChange={checkValidity} ref={payForm}>
          <div>
            <label htmlFor="CCname">Full name</label>
            <input placeholder="Full name" type="text" name="CCname" required />
          </div>
          <div>
            <label htmlFor="CCnumber">Card number</label>
            <input placeholder="Card number" type="text" name="CCnumber" required minlength="19" />
          </div>

          <aside className="creditCard">
            <div>
              <label htmlFor="CCexpiry">MM/YY</label>
              <input placeholder="MM/YY" type="text" name="CCexpiry" required minlength="7" />
            </div>
            <div>
              <label htmlFor="CCcvc">CVC</label>
              <input placeholder="CVC" type="text" name="CCcvc" required minlength="3" />
            </div>
          </aside>
        </form>
      </CardReactFormContainer>

      <div id="card-wrapper"></div>
    </>
  );
}

export default StepPayment;
