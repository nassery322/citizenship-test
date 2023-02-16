import { Fragment, useState } from "react";
import Button from "../../UI/Button";
import "./HomeContent.css";
import Signup from "./Forms/Signup";
import Login from "./Forms/Login";
import bookcover from "../../assets/bookcover.png";
import { Questions } from "../Tests/questions";
import { shuffleArray } from "../Tests/Tests";
import TestContainer from "../Tests/TestContainer";

const HomeContent = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showSampleTest, setShowSampleTest] = useState(false);
  const [retakeDisabled, setRetakeDisabled] = useState(true);
  const [form, setForm] = useState("signup");
  function signupModalPopUp() {
    setModalIsOpen((e) => !e);
  }
  function changeModalHandler() {
    if (form === "signup") {
      setForm("login");
    } else {
      setForm("signup");
    }
  }

  const sampleTestQuestions = Questions.slice(0, 15);
  const sampleTestHandler = () => {
    setShowSampleTest((e) => !e);
    props.hideNav((e) => !e);
  };
  const loginModalHandler = () => {
    signupModalPopUp();
    setForm("login");
  };
  return (
    <Fragment>
      {showSampleTest ? (
        <TestContainer
          questions={sampleTestQuestions}
          onClose={sampleTestHandler}
          retakeDisabled={retakeDisabled}
        />
      ) : (
        <section className="home-content">
          <section className="home-quotes">
            <p className="home-quote">
              Become a Canadian Citizen with our advanced online test prep
              platform.
            </p>
            <p className="home-quote2">
              Create an account to Ace the test and take a step closer to
              becoming a proud Canadian citizen.
            </p>
            <div className="home-buttons">
              <Button onClick={signupModalPopUp}>Create Account</Button>
              <button
                onClick={loginModalHandler}
                className={"check-btn"}
                style={{ width: "170px", margin: "20px" }}
              >
                Login
              </button>
              <Button className="sample-btn" onClick={sampleTestHandler}>
                Try Free Sample Test
              </Button>

              {form === "signup" ? (
                <Signup
                  onClick={signupModalPopUp}
                  show={modalIsOpen}
                  onChangeModal={changeModalHandler}
                />
              ) : (
                <Login
                  onLoginClose={signupModalPopUp}
                  onClick={signupModalPopUp}
                  show={modalIsOpen}
                  onChangeModal={changeModalHandler}
                />
              )}
            </div>
          </section>
          <section className="home-image">
            <img src={bookcover} alt="Maple leaf!" />
            <section className="book-buttons">
              <Button className="image-btn">
                <a href="https://www.canada.ca/content/dam/ircc/migration/ircc/english/pdf/pub/discover.pdf">
                  Download PDF
                </a>
              </Button>
              <Button className="image-btn">
                <a href="https://www.canada.ca/content/dam/ircc/migration/ircc/english/department/media/multimedia/audio/discover/discover-canada.mp3">
                  Audio Book
                </a>
              </Button>
            </section>
          </section>
        </section>
      )}
    </Fragment>
  );
};

export default HomeContent;
