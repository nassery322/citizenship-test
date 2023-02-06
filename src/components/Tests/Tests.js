import { Fragment, useState } from "react";
import TestItem from "./TestItem";
import "./Tests.css";
import citizenCert from "../../assets/citizencert.jpg";
import geography from "../../assets/geography.jpg";
import history from "../../assets/history.jpg";
import government from "../../assets/politics.jpg";
import law from "../../assets/law.jpg";
import symbols from "../../assets/symbols.jpg";
import economy from '../../assets/economy.jpg'
import Navbar from "../Home/Navbar/Navbar";
import {
  Ontario,
  YukonTerritories,
  Alberta,
  BritishColumbia,
  Manitoba,
  NewBrunswick,
  Newfoundland,
  NorthwestTerritories,
  NovaScotia,
  Nunavut,
  PrinceEdwardIsland,
  Quebec,
  Saskatchewan,
  Questions,
} from "./questions";
import TestContainer from "./TestContainer";
const Tests = () => {
  const [testIsStarted, setTestIsStarted] = useState(false)
  const [testQuestions, setTestQuestions] = useState()
  const testsArray = [
    {
      id: "t1",
      title: "Simulation Test",
      description:
        "Our simulation test replicates the format of the real Canadian Citizenship Test. It draws questions from every categories and are also timed which helps to further prepare you.",
      image: citizenCert,
      questions: Questions.slice(0, 15),
    },
    {
      id: "t2",
      title: "Geography Test",
      description:
        "A test focusing on Canadian geography and demographics. This test covers topics such as the physical geography of Canada, major cities and provinces, and demographic information.",
      image: geography,
      questions: Questions.filter(
        (question) => question.category && question.category.toLowerCase() === "geography"
        ),
    },
    {
      id: "t3",
      title: "History and Heritage Test",
      description:
        "A test focusing on Canadian history and heritage. This test covers topics such as important historical events, famous Canadians, and cultural heritage.",
      image: history,
      questions: Questions.filter(
        (question) => question.category && question.category.toLowerCase() === "history"
      ),
    },
    {
      id: "t4",
      title: "Political and Social Systems Test",
      description:
        "A test focusing on Canadian political and social systems. This test covers topics such as the parliamentary system, the role of the Prime Minister, and Canadian values.",
      image: government,
      questions: Questions.filter(
        (question) => question.category && question.category.toLowerCase() === "government"
      ),
    },
    {
      id: "t5",
      title: "Laws and Rights Test",
      description:
        "A test focusing on Canadian laws, rights, and freedoms. This test covers topics such as the Canadian Charter of Rights and Freedoms, criminal law, and the justice system.",
      image: law,
      questions: Questions.filter(
        (question) => question.category && question.category.toLowerCase() === "laws"
      ),
    },
    {
      id: "t6",
      title: "Symbols and Traditions Test",
      description:
        "A test focusing on Canadian symbols, holidays, and traditions. This test covers topics such as the Canadian flag, national anthem, and important holidays.",
      image: symbols,
      questions: Questions.filter(
        (question) => question.category && question.category.toLowerCase() === "symbols"
      ),
    },
    {
      id: "t7",
      title: "Economy Test",
      description:
        "A test focusing on the Canadian economy. This test covers topics such as currency, sources of government revenue, exports, stock exchange, banking sector regulation, unemployment and inflation rates, and minimum wage.",
      image: economy,
      questions: Questions.filter(
        (question) => question.category && question.category.toLowerCase() === "economy"
      )
    },
  ];
const startTestHandler = (questions) =>{
if(questions){
  // console.log(event)
setTestIsStarted(true)
setTestQuestions(questions)
}
}
  return (
    <Fragment>
      {testIsStarted? <TestContainer questions = {testQuestions}  /> : <section className="tests-section">
        <Navbar />
        <section className="test-items">
          {testsArray.map((test) => (
            <TestItem
              key={test.id}
              title={test.title}
              description={test.description}
              image={test.image}
              questions={test.questions}
              startTest={startTestHandler}
            />
          ))}
        </section>
      </section>}
    </Fragment>
  );
};

export default Tests;
