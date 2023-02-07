import { Fragment, useEffect } from "react";
import { Questions } from "./questions";

import "./TestItem.css";

const TestItem = (props) => {
  const startTestHandler = () => {
    props.idForRetake(props.id)
    if (props.id === "t1") {
      props.askForProvince(true);
      return;
    }

    props.startTest(props.questions);
    
  };
  useEffect(() => {

    if (props.id === "t1") {
      if (props.testIsClosed) {
        return;
      }
      if (props.province) {
        props.startTest(props.questions);
      }
    }

  }, [props.province]);

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
