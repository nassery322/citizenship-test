import React, { Fragment, useState } from "react";
import "./TestContainer.css";
import timerSvg from "../../assets/timer.svg";
import { YukonTerritories } from "./questions";
const TestContainer = () => {
  const [questionNum, setQuestionNum] = useState(0);
  // const [mainQuestion, setMainQuestion] = useState()
  const nextHandler = () => {
    if (questionNum < YukonTerritories.length - 1) {
      setQuestionNum((e) => e + 1);
    } else {
      return;
    }
  };
  const prevHandler = () => {
    setQuestionNum((e) => e - 1);
  };
  const mainQuestion = YukonTerritories[questionNum];
  return (
    <Fragment>
      <section className="test-container">
        <section className="test-container-main">
          <div className="timer">
            <div>
              <p className="question-number">Question {questionNum + 1} of {YukonTerritories.length}</p>
            </div>
            <div>
              <img src={timerSvg} alt="Timer" />
              <p>10:00</p>
            </div>
          </div>
          <div className="question">{mainQuestion.question}</div>
          <section className="options">
            <div>
              <strong>A. </strong>{" "}
              <p className="option1">{mainQuestion.option1}</p>
            </div>
            <div>
              <strong>B. </strong>{" "}
              <p className="option2">{mainQuestion.option2}</p>
            </div>
            <div>
              <strong>C. </strong>{" "}
              <p className="option3">{mainQuestion.option3}</p>
            </div>
            <div>
              <strong>D. </strong>{" "}
              <p className="option4">{mainQuestion.option4}</p>
            </div>
          </section>
          <section className="test-controls">
            {!questionNum < 1 && (
              <button className="test-btn" onClick={prevHandler}>
                Prev
              </button>
            )}
            <button className="test-btn" onClick={nextHandler}>
              Next
            </button>
          </section>
        </section>
      </section>
    </Fragment>
  );
};

export default TestContainer;
