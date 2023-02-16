import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./TestItem.css";
import { testActions } from "../../Store/testSlice";
const TestItem = (props) => {
  const dispatch = useDispatch();

  const testId = useSelector((state) => state.tests.testId);
  const startTestHandler = () => {
    dispatch(testActions.testIdHandler(props.id));
    window.scrollTo(0, 0);
    props.idForRetake(props.id);
    if (props.id === "t1") {
      props.askForProvince(true);
      return;
    }
    if (props.id === "t2") {
      props.askForProvince(true);
      props.askForNumberOfQuestions(true);
      return;
    }
    if (props.id === "t3") {
      
      props.askForNumberOfQuestions("geography");
      return;
    }
    props.startTest(props.questions);
    if (props.id === "t4") {
      props.askForNumberOfQuestions("history");
      return;
    }
    if (props.id === "t5") {
      props.askForNumberOfQuestions("government");
      return;
    }
    if (props.id === "t6") {
      props.askForNumberOfQuestions("laws");
      return;
    }
    if (props.id === "t7") {
      props.askForNumberOfQuestions("symbols");
      return;
    }
    if (props.id === "t8") {
      props.askForNumberOfQuestions("economy");
      return;
    }
    //props.startTest(props.questions);
  };
  function idenifier() {
    props.idForRetake(props.id);

    if (props.testIsClosed) {
      return;
    }
    if (props.numberOfQuestions) {
      props.startTest(props.questions);
      return;
    }
  }
  useEffect(() => {
    if (testId == "t1") {
      props.idForRetake(props.id);
      if (props.testIsClosed) {
        return;
      }
      if (props.province) {
        props.startTest();
      }
    }
    if (testId === "t2") {
      props.idForRetake(props.id);

      if (props.testIsClosed) {
        return;
      }
      if (props.numberOfQuestions && props.province) {
        props.startTest();
        return;
      }
    }
   else{
      props.idForRetake(props.id);

      if (props.testIsClosed) {
        return;
      }
      if (props.numberOfQuestions) {
        props.startTest();
        return;
      }
    }
  }, [
    props.province,
    props.questions,
    props.numberOfQuestions,
    props.idenifier,
  ]);

  return (
    <Fragment>
      <section className="test-item">
        <div className="test-image">
          <img src={props.image} alt="Test image" />
        </div>
        <header>{props.title}</header>
        <div className="test-description">{props.description}</div>
        <button className="start-test-btn" onClick={startTestHandler}>
          Start Test
        </button>
      </section>
    </Fragment>
  );
};

export default TestItem;
