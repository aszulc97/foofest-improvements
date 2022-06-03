function CountTicket(props) {
  function handleDecrement() {
    props.decrementCount(props.title);
  }
  function handleIncrement() {
    props.incrementCount(props.title);
  }

  return (
    <div className="counter">
      <button
        className="plusminus"
        onClick={handleDecrement}
        disabled={props.count < 1 ? "disabled" : null}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fillRule="currentColor"
          className="bi bi-dash"
          viewBox="0 0 16 16"
        >
          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
        </svg>
      </button>
      <div>{props.count}</div>
      <button
        className="plusminus"
        onClick={handleIncrement}
        disabled={props.ownTent || props.soldout}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fillRule="currentColor"
          className="bi bi-plus"
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
      </button>
    </div>
  );
}
export default CountTicket;
