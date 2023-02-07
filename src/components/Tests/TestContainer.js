import React, { Fragment, useState, useEffect } from "react";
import "./TestContainer.css";
import timerSvg from "../../assets/timer.svg";
import Results from "./Results";
import ProvinceSelector from "./ProvinceSelector";
import CloseTestContainer from "./CloseTestContainer";
import CheckAnswers from "./CheckAnswers";
const TestContainer = (props) => {
  const [questionNum, setQuestionNum] = useState(0);
  const [testIsFinished, setTestIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [closeTestContainer, setCloseTestContainer] = useState(false);
  const [checkAnswers, setCheckAnswers] = useState(false);

  const [answers, setAnswers] = useState(
    props.questions &&
      props.questions.map((item) => {
        return { correctOption: item.correctOption, selectedOption: "" };
      })
  );
  const nextHandler = () => {
    if (questionNum < props.questions.length - 1) {
      resetOptions();
      setQuestionNum((e) => e + 1);
    } else {
      testFinishedHandler();
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

  function testFinishedHandler() {
    setTestIsFinished(true);
    // setTestCheck(false);
    let points = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].correctOption === answers[i].selectedOption) {
        points = points + 1;
      }
    }
    setScore(points);
  }
  const closeModalHandler = () => {
    if (!testIsFinished) {
      setCloseTestContainer((e) => !e);
    } else {
      props.onClose(true);
    }
  };
  const closeTestContainerHandler = () => {
    props.onClose(true);
  };
  const checkAnswersHandler = () => {
    setCheckAnswers(true);
    setQuestionNum(0);
    setTestIsFinished(false)
  };

  let timer;
  useEffect(
    function timerStart() {
      let time = 600;
      timer = setInterval(() => {
        time--;
        if (time < 0) time = 0;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        const timeState = document.getElementById("timer");

        if (timeState) {
          timeState.innerHTML = `${minutes}:${
            seconds < 10 ? "0" : ""
          }${seconds}`;
        }

        if (time === 0) {
          clearInterval(timer);
          testFinishedHandler();
        }
      }, 1000);
      return () => clearInterval(timer);
    },
    [testIsFinished]
  );
  const retakeTestHandler = () =>{
    props.onRetake(props.id)
    setTestIsFinished(false)
    setQuestionNum(0)
   setCheckAnswers(false)
  }
  useEffect(()=>{
    setAnswers(props.questions &&
      props.questions.map((item) => {
        return { correctOption: item.correctOption, selectedOption: "" };
      }))
  },[props.questions])

  return (
    <Fragment>
      <div
        className="close-btn"
        style={{ fontSize: "3rem" }}
        onClick={closeModalHandler}
      >
        &times;
      </div>
      <CloseTestContainer
        show={closeTestContainer}
        onClose={closeModalHandler}
        onCloseContainer={closeTestContainerHandler}
      />

      <section className="test-container">
        {testIsFinished ? (
          <Results
            onCheck={checkAnswersHandler}
            onRetake={retakeTestHandler}
            score={score}
            numberOfQuestions={props.questions.length}
          />
        ) : (
          <section className="test-container-main">
            <div className="timer">
              <div>
                <p className="question-number">
                  Question {questionNum + 1} of {props.questions.length}
                </p>
              </div>
              {!checkAnswers && <div>
                <img src={timerSvg} alt="Timer" />
                <p id="timer">10:00</p>
              </div>}
            </div>
            <div className="question">{mainQuestion.question}</div>
            {checkAnswers ? (
              <CheckAnswers
                 mainQuestion={mainQuestion}
                 questionNum={questionNum}
                answers={answers}
              />
            ) : (
              <section className="options">
                <div
                  className={`option ${
                    selectedOption === mainQuestion.option1
                      ? "selectedOption"
                      : ""
                  }`}
                  onClick={optionHandler}
                >
                  <strong>A. </strong>
                  <p className="option1">{mainQuestion.option1}</p>
                </div>
                <div
                  className={`option ${
                    selectedOption === mainQuestion.option2
                      ? "selectedOption"
                      : ""
                  }`}
                  onClick={optionHandler}
                >
                  <strong>B. </strong>
                  <p className="option2">{mainQuestion.option2}</p>
                </div>
                <div
                  className={`option ${
                    selectedOption === mainQuestion.option3
                      ? "selectedOption"
                      : ""
                  }`}
                  onClick={optionHandler}
                >
                  <strong>C. </strong>
                  <p className="option3">{mainQuestion.option3}</p>
                </div>
                <div
                  className={`option ${
                    selectedOption === mainQuestion.option4
                      ? "selectedOption"
                      : ""
                  }`}
                  onClick={optionHandler}
                >
                  <strong>D. </strong>
                  <p className="option4">{mainQuestion.option4}</p>
                </div>
              </section>
            )}
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
        )}
      </section>
    </Fragment>
  );
};

export default TestContainer;
