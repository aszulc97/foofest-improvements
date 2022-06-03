import Question from "./Question";
import faqData from "../faq.json";
import { useState } from "react";

//searchbar help: https://dev.to/salehmubashar/search-bar-in-react-js-545l
export default function FAQ() {
  const [searchInput, setSearchInput] = useState("");
  function handleSearch(e) {
    setSearchInput(e.target.value.toLowerCase());
  }

  const filteredData = faqData.filter((el) => {
    if (searchInput === "") return el;
    else return el.question.toLowerCase().includes(searchInput);
  });

  return (
    <div className="questionsContainer">
      <h2>Frequently asked questions</h2>
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

      {filteredData.map((item) => (
        <Question key={item.id} question={item.question} answer={item.answer}></Question>
      ))}
    </div>
  );
}
