import CountTicket from "./CountTicket";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function StepTickets(props) {
  function handleAddToBasket(type) {
    props.incrementCount(type);
  }

  const { checkIfSoldout } = props;

  useEffect(() => {
    checkIfSoldout();
  }, [checkIfSoldout]);

  return (
    <>
      <h4 className="stepTitle">Your shopping cart</h4>
      {props.vipCount === 0 && props.regularCount === 0 && (
        <div>
          <p className="emtyCart">Your shopping cart is empty</p>
          <Link to="/tickets" className="link">
            Click here to buy tickets
          </Link>
        </div>
      )}
      {props.soldout && <p className="soldoutTickets">YOU CANNOT ADD MORE TICKETS - NO CAMPING SPOTS AVAILABLE</p>}
      {/* VIP */}
      <div className="cartRow" style={props.vipCount < 1 ? { display: "none" } : null}>
        <p>VIP ticket</p>
        <CountTicket
          title="VIP"
          count={props.vipCount}
          price={props.vipPrice}
          incrementCount={props.incrementCount}
          decrementCount={props.decrementCount}
          soldout={props.soldout}
        />
        <p>{props.vipPrice}kr</p>

        <button onClick={props.resetVipTicket}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fillRule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </button>
      </div>
      {/* REGULAR */}
      <div className="cartRow" style={props.regularCount < 1 ? { display: "none" } : null}>
        <p>Regular ticket</p>
        <CountTicket
          title="REGULAR"
          count={props.regularCount}
          price={props.regularPrice}
          incrementCount={props.incrementCount}
          decrementCount={props.decrementCount}
          soldout={props.soldout}
        />
        <p>{props.regularPrice}kr</p>

        <button onClick={props.resetRegularTicket}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fillRule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </button>
      </div>
      {(props.vipCount === 0 || props.regularCount === 0) && !(props.vipCount === 0 && props.regularCount === 0) && (
        <div>
          <span>Add more</span>
          <article>
            <div>
              <p>{props.vipCount === 0 ? "VIP ticket" : props.regularCount === 0 ? "Regular ticket" : null}</p>
              <p>{props.vipCount === 0 ? props.vipPrice : props.regularCount === 0 ? props.regularPrice : null}</p>
            </div>
            <button
              disabled={props.soldout}
              className="secondaryCTA addToCartBtn"
              onClick={() =>
                props.vipCount === 0 ? handleAddToBasket("VIP") : props.regularCount === 0 ? handleAddToBasket("REGULAR") : null
              }
            >
              Add to cart
            </button>
          </article>
        </div>
      )}
    </>
  );
}

export default StepTickets;
