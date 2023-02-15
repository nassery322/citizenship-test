import { Fragment, useEffect } from "react";

import "./TestItem.css";

const TestItem = (props) => {
  const startTestHandler = () => {
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
     if(props.id === "t3"){
      props.askForNumberOfQuestions('geography');
      return;
    }
    if(props.id === "t4"){
      props.askForNumberOfQuestions('history');
      return;
    }
    if(props.id === "t5"){
      props.askForNumberOfQuestions('government');
      return;
    }
    if(props.id === "t6"){
      props.askForNumberOfQuestions('laws');
      return;
    }
    if(props.id === "t7"){
      props.askForNumberOfQuestions('symbols');
      return;
    }
    if(props.id === "t8"){
      props.askForNumberOfQuestions('economy');
      return;
    }
    
  };
  useEffect(() => {
 
    if (props.id === "t1") {
      props.idForRetake(props.id);
      if (props.testIsClosed) {
        return;
      }
      if (props.province) {
        props.startTest(props.questions);
      }
    }
    
    if (props.id === "t2") {
      props.idForRetake(props.id);
      if (props.testIsClosed) {
        return;
      }
      if (props.numberOfQuestions && props.province) {
        props.startTest(props.questions);
      }
      return;
    }
    
    
  }, [props.province, props.questions, props.numberOfQuestions]);




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
