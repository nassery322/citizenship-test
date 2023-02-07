import { Fragment } from "react";
import Button from "../../UI/Button";
import "./Results.css";

const Results = (props) => {
  const {score, numberOfQuestions} = props
  const percentage = ((score/numberOfQuestions) * 100).toFixed(0);
  const qualification = percentage > 75 ? 'You Have Qualified The Test!' : 'You Have Failed The Test!'
  const styles = percentage > 75 ? {'color': '#17d4ae'} :  {'color': '#e21b1b '}
  return (
    <Fragment>
      <section className="results">
        <section className="results-qualification" style={styles}>
          {qualification}
        </section>
        <section className="main-results">
          You Answered {score} out of {numberOfQuestions} questions
        </section>
        <div className="results-pie animate no-round" style={{"--p":`${percentage}`}}>{percentage}%</div>
        <div className="results-buttons">
            <button className="check-btn">Check Answers</button>
            <Button>Retake Test</Button>

        </div>
      </section>
    </Fragment>
  );
};

export default Results;
