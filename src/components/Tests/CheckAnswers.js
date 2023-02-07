import "./CheckAnswers.css";

const CheckAnswers = (props) => {
  const mainQuestion = props.mainQuestion;
  const questionNum = props.questionNum;

  const selectedOption = props.answers[questionNum].selectedOption;
  const correctOption = props.answers[questionNum].correctOption;

  const answerCheck =
    props.answers[questionNum].selectedOption ==
    props.answers[questionNum].correctOption;
console.log(questionNum)

  console.log(correctOption);
  return (
    <section className="options">
      <div
        className={`option ${
          selectedOption === mainQuestion.option1
            ? answerCheck
              ? "right-answer"
              : "wrong-answer"
            : correctOption === mainQuestion.option1
            ? "right-answer"
            : ""
        }`}
      >
        <strong>A. </strong>
        <p className="option1">{mainQuestion.option1}</p>
      </div>
      <div
        className={`option ${
          selectedOption === mainQuestion.option2
            ? answerCheck
              ? "right-answer"
              : "wrong-answer"
            : correctOption === mainQuestion.option2
            ? "right-answer"
            : ""
        }`}
      >
        <strong>B. </strong>
        <p className="option2">{mainQuestion.option2}</p>
      </div>
      <div
        className={`option ${
          selectedOption === mainQuestion.option3
            ? answerCheck
              ? "right-answer"
              : "wrong-answer"
            : correctOption === mainQuestion.option3
            ? "right-answer"
            : ""
        }`}
      >
        <strong>C. </strong>
        <p className="option3">{mainQuestion.option3}</p>
      </div>
      <div
        className={`option ${
          selectedOption === mainQuestion.option4
            ? answerCheck
              ? "right-answer"
              : "wrong-answer"
            : correctOption === mainQuestion.option4
            ? "right-answer"
            : ""
        }`}
      >
        <strong>D. </strong>
        <p className="option4">{mainQuestion.option4}</p>
      </div>
    </section>
  );
};

export default CheckAnswers;
