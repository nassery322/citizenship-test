import { Fragment, useEffect } from "react";

import "./TestItem.css";

const TestItem = (props) => {
  const startTestHandler = () => {
    if(props.id === 't1'){
      props.askForProvince(true)
    return;
    }
    props.startTest({ startTest: true, questions: props.questions });
  };
 useEffect(()=>{
  if(props.id === 't1'){
    if(props.testIsClosed){
      return;
    }
    if(props.province){
      props.startTest({ startTest: true, questions: props.questions });
    }
  }

 },[props.province])
 
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
