import { useState } from "react";
import MatchMediaWrapper from "./MatchMediaWrapper";
import "../style/App.css";

function App() {
  const [adviceDetails, setAdviceDetails] = useState({});
  const [loader, setLoader] = useState(false);
  const api = "https://api.adviceslip.com/advice";

  const mobileContent = (
    <svg width="295" height="16" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z" />
        <g transform="translate(138)" fill="#CEE3E9">
          <rect width="6" height="16" rx="3" />
          <rect x="14" width="6" height="16" rx="3" />
        </g>
      </g>
    </svg>
  );
  const desktopContent = (
    <svg width="444" height="16" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <path fill="#4F5D74" d="M0 8h196v1H0zM248 8h196v1H248z" />
        <g transform="translate(212)" fill="#CEE3E9">
          <rect width="6" height="16" rx="3" />
          <rect x="14" width="6" height="16" rx="3" />
        </g>
      </g>
    </svg>
  );

  async function generateAdvice() {
    setLoader(true);

    fetch(api)
      .then((response) => response.json())
      .then((value) => setAdviceDetails(value))
      .catch((error) => console.log(error.message));

    setLoader(false);
  }

  return (
    <div className="wrapper">
      <h4 className="advice-id">
        Advice {`#${adviceDetails.slip ? adviceDetails.slip.id : 0}`}
      </h4>
      <p className="advice">
        {adviceDetails.slip
          ? adviceDetails.slip.advice
          : "Click to generate random advice"}
      </p>
      {loader ? (
        <div className={"loader"}>LOADING</div>
      ) : null}
      <MatchMediaWrapper
        mobileContent={mobileContent}
        desktopContent={desktopContent}
      />
      <p
        className="icon-dice"
        onClick={() => {
          generateAdvice();
        }}
      >
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
            fill="#202733"
          />
        </svg>
      </p>
    </div>
  );
}

export default App;
