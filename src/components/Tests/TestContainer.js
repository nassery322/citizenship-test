import React, { Fragment } from "react";
import "./TestContainer.css";
import timerSvg from "../../assets/timer.svg";
const TestContainer = () => {
  return (
    <Fragment>
      <section className="test-container">
        <section className="test-container-main">
          <div className="timer">
            <div>
              <p className="question-number">Question 1 of 20</p>
            </div>
            <div>
              <img src={timerSvg} alt="Timer" />
              <p>10:00</p>
            </div>
          </div>
          <div className="question">
            A Member of Parliament from Montreal announces that she will spend
            her weekend in her electoral district. This means she would be:
          </div>
          <section className="options">
            <div className="option1">
              <strong>A. </strong> In her office on Parliament Hill.
            </div>
            <div className="option2">
              <strong>B. </strong> Visiting the province of Quebec.
            </div>
            <div className="option3">
              <strong>C. </strong> In the part of Montreal where she was
              elected.
            </div>
            <div className="option4">
              <strong>D. </strong> Going on a vacation.
            </div>
          </section>
          <section className="test-controls">
            <button className="test-btn">Prev</button>
            <button className="test-btn">Next</button>
          </section>
        </section>
      </section>
    </Fragment>
  );
};

export default TestContainer;
