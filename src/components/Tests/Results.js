import { Fragment, useEffect, useState } from "react";
import Button from "../../UI/Button";
import "./Results.css";
import { firebaseDatabase, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
const Results = (props) => {
  const { score, numberOfQuestions } = props;
  const percentage = ((score / numberOfQuestions) * 100).toFixed(0);
  const qualification =
    percentage > 75
      ? "You Have Qualified The Test!"
      : "You Have Failed The Test!";
  const styles = percentage > 75 ? { color: "#17d4ae" } : { color: "#e21b1b " };
  const [scoresend, setscoresend] = useState(false);
  async function sendRequest(id) {
    if (!scoresend) {
      const scoreData = percentage;

      const categoryScores = props.categoryScores;
      if(!categoryScores){
        return;
      }
      const categories = Object.keys(categoryScores);

      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const responseCategory = await fetch(
          `${firebaseDatabase}/usersprogress/${id}/progressByCategory/${category}.json`
        );
        let categoryData = await responseCategory.json();
        if (!categoryData) {
          categoryData = [];
        } else {
          categoryData = Object.values(categoryData);
        }
        categoryData.unshift(categoryScores[category]);
       
        if (categoryData.length > 7) {
          categoryData.pop();
        }

        await fetch(
          `${firebaseDatabase}/usersprogress/${id}/progressByCategory/${category}.json`,
          {
            method: "PUT",
            body: JSON.stringify(categoryData),
          }
        );
        setscoresend(true);
      }
    }
  }

  useEffect(() => {
    if (!scoresend && props.sendScore) {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser && currentUser.uid) {
          sendRequest(currentUser.uid);
        }
      });
    } else {
      return;
    }
  }, [props.score, props.sendScore]);
  const error = props.retakeDisabled && "Sign up to access all test materials!"
  return (
    <Fragment>
      <section className="results">
        <section className="results-qualification" style={styles}>
          {qualification}
        </section>
        <section className="main-results">
          You Answered {score} out of {numberOfQuestions} questions
        </section>
        <div
          className="results-pie animate no-round"
          style={{ "--p": `${percentage}` }}
        >
          {percentage}%
        </div>
        <div className="results-buttons">
          <button className="check-btn" onClick={props.onCheck}>
            Check Answers
          </button>
          <Button onClick={props.onRetake} disabled={props.retakeDisabled}>Retake Test</Button>
          <p style={{'color': '#d22a2a' , 'fontSize': '1.2rem'}}>{error}</p>
        </div>
      </section>
    </Fragment>
  );
};

export default Results;
