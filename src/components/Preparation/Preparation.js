import { Fragment, useEffect } from "react";
import Navbar from "../Home/Navbar/Navbar";
import "./Preparation.css";

const Preparation = (props) => {

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
  
    const handlePopState = () => {
      props.onClose();
    };
    
    window.addEventListener("popstate", () => {
      handlePopState();
    });
    
   
   
  }, [props.onClose]);
  
  return (
    <Fragment>
      <section className="preparation">
        <div className="side-shape"></div>
        <section className="preparation-content">
            <header>Prepare for the test :</header>
          <strong>What’s on the test? </strong>
          The test shows what you know about Canada. you’ll be
          asked 20 questions about the rights and responsibilities of
          Canadians and Canada’s:
          <ul className="categories-list">
            <li>History</li>
            <li>Geography</li>
            <li>Economy</li>
            <li>Government and politics</li>
            <li>Laws</li>
            <li>Symbols</li>
          </ul>
               
         the test questions are based on the official citizenship study
          guide: Discover Canada: The Rights and Responsibilities of
          Citizenship. 
          <p><b>Note!</b> The citizenship test are not used to assess your language
          skills in English or French.</p>

          <strong>Study for the test :</strong>
          Use the official study guide, "Discover Canada: The Rights and Responsibilities of Citizenship" to study for your test.
          <p>The official study guide is available in our website in multiple formats:</p>
          <ul>
            <li><a href="https://www.canada.ca/content/dam/ircc/migration/ircc/english/pdf/pub/discover.pdf" >Download PDF</a></li>
            <li><a href="https://www.canada.ca/content/dam/ircc/migration/ircc/english/department/media/multimedia/audio/discover/discover-canada.mp3">Download MP3</a></li>
          </ul>
        </section>
        <div className="bottom-side-shape"></div>
      </section>
    </Fragment>
  );
};

export default Preparation;
