import React, { Fragment, useState } from "react";
import "./TestContainer.css";
import timerSvg from "../../assets/timer.svg";
import Results from "./Results";
import ProvinceSelector from "./ProvinceSelector";
const TestContainer = (props) => {
  const [questionNum, setQuestionNum] = useState(0);
  const [testIsFinished, setTestIsFinished] = useState(false);
  // const [province, setProvince] = useState(null)
  const [answers, setAnswers] = useState(
    props.questions && props.questions.map((item) => {
      return { correctOption: item.correctOption, selectedOption: "" };
    })
  );

  const nextHandler = () => {
    if (questionNum < props.questions.length - 1) {
      resetOptions();
      setQuestionNum((e) => e + 1);
    } else {
      return;
    }
  };
  const prevHandler = () => {
    resetOptions();
    setQuestionNum((e) => e - 1);
  };

  const resetOptions = () => {
    const options = document.querySelectorAll(".option");
    options.forEach((option) => option.classList.remove("selectedOption"));
  };

  const optionHandler = (e) => {
    let target = e.target;
    if (target.tagName === "P") {
    target = target.parentNode;
    }
    
    answers[questionNum].selectedOption = target.children[1].innerHTML;
    
    resetOptions();
    
    target.classList.add("selectedOption");
    };

  const mainQuestion = props.questions[questionNum];
  const selectedOption = answers[questionNum].selectedOption;
    // const provinceHandler = (province) =>{
    //   setProvince(true)
    //   props.onProvinceSelect(province)
    // }
    
  return (
    <Fragment>
      <div className="close-btn" style={{'fontSize':'3rem'}}>&times;</div>
      <section className="test-container">
        {testIsFinished? <Results /> :<section className="test-container-main">
          <div className="timer">
            <div>
              <p className="question-number">
                Question {questionNum + 1} of {props.questions.length}
              </p>
            </div>
            <div>
              <img src={timerSvg} alt="Timer" />
              <p>10:00</p>
            </div>
          </div>
          <div className="question">{mainQuestion.question}</div>
          <section className="options">
            <div
              className={`option ${
                selectedOption === mainQuestion.option1 ? "selectedOption" : ""
              }`}
              onClick={optionHandler}
            >
              <strong>A. </strong>
              <p className="option1">
                {mainQuestion.option1}
              </p>
            </div>
            <div
              className={`option ${
                selectedOption === mainQuestion.option2 ? "selectedOption" : ""
              }`}
              onClick={optionHandler}
            >
              <strong>B. </strong>
              <p className="option2">{mainQuestion.option2}</p>
            </div>
            <div
              className={`option ${
                selectedOption === mainQuestion.option3 ? "selectedOption" : ""
              }`}
              onClick={optionHandler}
            >
              <strong>C. </strong>
              <p className="option3">{mainQuestion.option3}</p>
            </div>
            <div
              className={`option ${
                selectedOption === mainQuestion.option4 ? "selectedOption" : ""
              }`}
              onClick={optionHandler}
            >
              <strong>D. </strong>
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
        </section>}
      </section>
    </Fragment>
  );
};

export default TestContainer;