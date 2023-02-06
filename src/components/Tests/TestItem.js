import { useState } from "react";
import TestContainer from "./TestContainer";
import "./TestItem.css";

const TestItem = (props) => {
  const startTestHandler = () => {
props.startTest(props.questions)
// props.testTitle(props.title)


  }
  return (
    <section className="test-item">
      <div className="test-image">
        <img src={props.image} alt="Test image" />
      </div>
        <header>{props.title}</header>
        <div className="test-description">{props.description}</div>
        <button className="start-test-btn" onClick={startTestHandler}>Start Test</button>
    </section>
  );
};

export default TestItem;
