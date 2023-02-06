import { Fragment } from "react";
import Button from "../../UI/Button";
import "./Results.css";

const Results = () => {
  return (
    <Fragment>
      <section className="results">
        <section className="results-qualification">
          You Have qualified The Test!
        </section>
        <section className="main-results">
          You Answered 15 out of 20 questions
        </section>
        <div className="results-pie animate no-round" style={{"--p":"80"}}> 80%</div>
        <div className="results-buttons">
            <button className="check-btn">Check Results</button>
            <Button>Retake Test</Button>

        </div>
      </section>
    </Fragment>
  );
};

export default Results;
