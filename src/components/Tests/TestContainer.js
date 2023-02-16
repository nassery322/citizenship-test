import React, { Fragment, useState, useEffect } from "react";
import "./TestContainer.css";
import timerSvg from "../../assets/timer.svg";
import Results from "./Results";
import CloseTestContainer from "./CloseTestContainer";
import CheckAnswers from "./CheckAnswers";
import { firebaseDatabase } from "../firebase";
import { useHistory } from "react-router-dom";
const TestContainer = (props) => {
  const [questionNum, setQuestionNum] = useState(0);
  const [testIsFinished, setTestIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [closeTestContainer, setCloseTestContainer] = useState(false);
  const [checkAnswers, setCheckAnswers] = useState(false);
  const [sendScore, setSendScore] = useState(false);
  const [categoryScores, setCategoryScores] = useState({});
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
  const [answers, setAnswers] = useState(
    props.questions &&
      props.questions.map((item) => {
        return {
          correctOption: item.correctOption,
          selectedOption: "",
          category: item.category && item.category.toLowerCase(),
        };
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
    setNextBtnDisabled(false);
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
  const questionsLength = props.questions.length;
  function testFinishedHandler() {
    setTestIsFinished(true);
    let points = 0;
    let categories = {};
    const categorySet = new Set(answers.map((a) => a.category));
    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];
      if (answer.correctOption === answer.selectedOption) {
        points = points + 1;
        const category = answer.category;
        if (!categories[category]) {
          categories[category] = 0;
        }
        categories[category] += 1;
      }
    }
    for (let category of categorySet) {
      if (!categories[category]) {
        categories[category] = 0;
      } else {
        const numOfQuestions = props.questions.filter(
          (q) => q.category === category
        ).length;
        if (numOfQuestions === 0) {
          categories[category] = 0;
        } else {
          categories[category] = (categories[category] / numOfQuestions) * 100;
          categories[category] = categories[category].toFixed(0);
        }
      }
    }
    setScore(points);
    setCategoryScores(categories);
  }
  
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!testIsFinished) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [testIsFinished]);
  
  
  useEffect(() => {
    window.addEventListener("popstate", closeModalHandler);
  }, [testIsFinished]);

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

  let timer;
  useEffect(
    function timerStart() {
      let time;
      if (questionsLength <= 20) {
        time = 600;
      }
      if (questionsLength > 20) {
        time = 1800;
      }
      if (questionsLength >= 80) {
        time = 2700;
      }
      timer = setInterval(() => {
        if (checkAnswers) {
          return;
        }
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

  const checkAnswersHandler = () => {
    setSendScore(false);
    setCheckAnswers(true);
    setQuestionNum(0);
    setTestIsFinished(false);
  };

  const retakeTestHandler = () => {
    setSendScore(false);
    props.onRetake(props.id);
    setTestIsFinished(false);
    setQuestionNum(0);
    setCheckAnswers(false);
    setScore(0);
    setCategoryScores({});
  };

  useEffect(() => {
    if (answers[questionNum].selectedOption == "") {
      setNextBtnDisabled(true);
    } else {
      setNextBtnDisabled(false);
    }
  }, [answers[questionNum].selectedOption]);

  useEffect(() => {
    setAnswers(
      props.questions &&
        props.questions.map((item) => {
          return {
            correctOption: item.correctOption,
            selectedOption: "",
            category: item.category && item.category.toLowerCase(),
          };
        })
    );
  }, [props.questions]);
  const nextOrFinish = questionNum === questionsLength - 1 ? "Finish" : "Next";

  const sendDataToFirebase = async () => {
    setSendScore(true);
    testFinishedHandler();
  };
  const disabled = props.retakeDisabled;
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

      <section className="test-container" id="test-container">
        {testIsFinished ? (
          <Results
            onCheck={checkAnswersHandler}
            onRetake={retakeTestHandler}
            score={score}
            numberOfQuestions={questionsLength}
            sendScore={sendScore}
            categoryScores={categoryScores}
            id={props.id}
            retakeDisabled={disabled}
          />
        ) : (
          <section className="test-container-main">
            <div className="timer">
              <div>
                <p className="question-number">
                  Question {questionNum + 1} of {questionsLength}
                </p>
              </div>
              {!checkAnswers && (
                <div>
                  <img src={timerSvg} alt="Timer" />
                  <p id="timer">
                    {questionsLength > 20
                      ? questionsLength >= 80
                        ? "45:00"
                        : "30:00"
                      : "10:00"}
                  </p>
                </div>
              )}
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
              <button
                className="test-btn"
                disabled={nextBtnDisabled}
                onClick={
                  questionNum < questionsLength - 1 || checkAnswers
                    ? nextHandler
                    : sendDataToFirebase
                }
              >
                {nextOrFinish}
              </button>
            </section>
          </section>
        )}
      </section>
    </Fragment>
  );
};

export default TestContainer;
