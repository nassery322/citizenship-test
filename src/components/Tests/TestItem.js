import { Fragment, useEffect, useState } from "react";
import ProvinceSelector from "./ProvinceSelector";
import TestContainer from "./TestContainer";
import "./TestItem.css";

const TestItem = (props) => {
  const [province, setProvince] = useState(null)
  const startTestHandler = () => {
    if(props.id === 't1'){
      props.province(true)
    
    }
    props.startTest({ startTest: true, questions: props.questions });
  };
 useEffect(()=>{
  if(props.id === 't1'){
    if(props.p){
      props.startTest({ startTest: true, questions: props.questions });
    }
  }

 },[props.p])
 
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
