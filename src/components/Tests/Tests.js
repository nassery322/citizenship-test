import { Fragment, useEffect, useState } from "react";
import TestItem from "./TestItem";
import "./Tests.css";
import citizenCert from "../../assets/citizencert.jpg";
import geography from "../../assets/geography.jpg";
import history from "../../assets/history.jpg";
import government from "../../assets/politics.jpg";
import law from "../../assets/law.jpg";
import symbols from "../../assets/symbols.jpg";
import economy from "../../assets/economy.jpg";
import rplLogo from "../../assets/rpl-logo.png";
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
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";


export function shuffleArray(a, b) {
  return Math.random() - 0.5;
}
const Tests = (props) => {
  const dispatch = useDispatch();
  const [testIsStarted, setTestIsStarted] = useState(false);
  const [testQuestions, setTestQuestions] = useState();
  const [province, setProvince] = useState(null);
  const [testIsClosed, setTestIsClosed] = useState(false);
  const [testId, setTestId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState(null);

  const TestId = useSelector((state) => state.tests.testId);

  const testsArray = [
    {
      id: "t1",
      title: "Simulation Test",
      description:
        "Our simulation test replicates the format of the real Canadian Citizenship Test. It draws questions from every categories and are also timed which helps to further prepare you.",
      image: citizenCert,
      questions: Questions.sort(shuffleArray)
        .slice(0, 18)
        .concat(province ? province.sort(shuffleArray).slice(0, 2) : ""),
    },
    {
      id: "t2",
      title: "Richmond Library Test",
      description:
        "The practice test consists of over 100 multiple choice questions derived from the book Discover Canada, on which the test is based",
      image: rplLogo,
      questions:
        numberOfQuestions && numberOfQuestions >= 15
          ? Questions.sort(shuffleArray)
              .slice(0, numberOfQuestions - 5)
              .concat(province ? province.sort(shuffleArray).slice(0, 5) : "")
          : numberOfQuestions === "all"
          ? Questions.sort(shuffleArray)
              .slice(0, 150)
              .concat(province ? province.sort(shuffleArray).slice(0, 5) : "")
          : Questions.sort(shuffleArray).slice(0, numberOfQuestions),
    },
    {
      id: "t3",
      title: "Geography Test",
      description:
        "A test focusing on Canadian geography and demographics. This test covers topics such as the physical geography of Canada, major cities and provinces, and demographic information.",
      image: geography,
      questions: Questions.sort(shuffleArray)
        .filter(
          (question) =>
            question.category && question.category.toLowerCase() === "geography"
        )
        .sort(shuffleArray)
        .slice(0, numberOfQuestions),
    },
    {
      id: "t4",
      title: "History and Heritage Test",
      description:
        "A test focusing on Canadian history and heritage. This test covers topics such as important historical events, famous Canadians, and cultural heritage.",
      image: history,
      questions: Questions.sort(shuffleArray)
        .filter(
          (question) =>
            question.category && question.category.toLowerCase() === "history"
        )
        .slice(0, numberOfQuestions),
    },
    {
      id: "t5",
      title: "Political and Social Systems Test",
      description:
        "A test focusing on Canadian political and social systems. This test covers topics such as the parliamentary system, the role of the Prime Minister, and Canadian values.",
      image: government,
      questions: Questions.sort(shuffleArray)
        .filter(
          (question) =>
            question.category &&
            question.category.toLowerCase() === "government"
        )
        .slice(0, numberOfQuestions),
    },
    {
      id: "t6",
      title: "Laws and Rights Test",
      description:
        "A test focusing on Canadian laws, rights, and freedoms. This test covers topics such as the Canadian Charter of Rights and Freedoms, criminal law, and the justice system.",
      image: law,
      questions: Questions.sort(shuffleArray)
        .filter(
          (question) =>
            question.category && question.category.toLowerCase() === "laws"
        )
        .slice(0, numberOfQuestions),
    },
    {
      id: "t7",
      title: "Symbols and Traditions Test",
      description:
        "A test focusing on Canadian symbols, holidays, and traditions. This test covers topics such as the Canadian flag, national anthem, and important holidays.",
      image: symbols,
      questions: Questions.sort(shuffleArray)
        .filter(
          (question) =>
            question.category && question.category.toLowerCase() === "symbols"
        )
        .slice(0, numberOfQuestions),
    },
    {
      id: "t8",
      title: "Economy Test",
      description:
        "A test focusing on the Canadian economy. This test covers topics such as currency, sources of government revenue, exports, stock exchange, banking sector regulation, unemployment and inflation rates, and minimum wage.",
      image: economy,
      questions: Questions.sort(shuffleArray)
        .filter(
          (question) =>
            question.category && question.category.toLowerCase() === "economy"
        )
        .slice(0, numberOfQuestions),
    },
  ];
  const startTestHandler = () => {
    const questions = testsArray.find((test) => test.id === TestId)?.questions;
    
    setTestIsStarted(true);
    props.testIsStarted(true);
    setTestQuestions(questions);
    window.history.forward()
  };

  const provinceSelectHandler = (provinceCode) => {
    if (provinceCode === "ON") {
      setProvince(Ontario);
    }
    if (provinceCode === "YT") {
      setProvince(YukonTerritories);
    }
    if (provinceCode === "AB") {
      setProvince(Alberta);
    }
    if (provinceCode === "BC") {
      setProvince(BritishColumbia);
    }
    if (provinceCode === "MB") {
      setProvince(Manitoba);
    }
    if (provinceCode === "NB") {
      setProvince(NewBrunswick);
    }
    if (provinceCode === "NL") {
      setProvince(Newfoundland);
    }
    if (provinceCode === "NT") {
      setProvince(NorthwestTerritories);
    }
    if (provinceCode === "NS") {
      setProvince(NovaScotia);
    }
    if (provinceCode === "NU") {
      setProvince(Nunavut);
    }
    if (provinceCode === "PE") {
      setProvince(PrinceEdwardIsland);
    }
    if (provinceCode === "QC") {
      setProvince(Quebec);
    }
    if (provinceCode === "SK") {
      setProvince(Saskatchewan);
    }
  };

  useEffect(() => {
    if (props.province) {
      provinceSelectHandler(props.province);
    }

    setNumberOfQuestions(props.numberOfQuestions);
  }, [province, props.numberOfQuestions]);

  function askForProvinceHandler() {
    setTestIsClosed(false);
    props.askForProvince(true);
  }

  function askForNumberOfQuestionsHandler(category) {
    setTestIsClosed(false);
    props.askForNumberOfQuestions(category);
  }
  function closeContainerHandler() {
    setTestIsStarted(false);
    props.testIsStarted(false);
    setTestIsClosed(true);
  }
  const retakeTestHandler = (id) => {
    setTestIsStarted(false);
    startTestHandler(testsArray.find((test) => test.id === id).questions);
  };
 
  function testIdentfierHandler(id) {
    setTestId(id);
    
  }
  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <Fragment>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
          {testIsStarted ? (
            <TestContainer
              questions={testQuestions}
              onClose={closeContainerHandler}
              onRetake={retakeTestHandler}
              id={testId}
            />
          ) : (
            <section className="tests-section">
              <section className="test-items">
                {testsArray.map((test) => (
                  <TestItem
                    idForRetake={testIdentfierHandler}
                    key={test.id}
                    id={test.id}
                    
                    title={test.title}
                    description={test.description}
                    image={test.image}
                    questions={test.questions}
                    province={province}
                    numberOfQuestions={numberOfQuestions}
                    startTest={startTestHandler}
                    askForProvince={askForProvinceHandler}
                    askForNumberOfQuestions={askForNumberOfQuestionsHandler}
                    testIsClosed={testIsClosed}
                  />
                ))}
              </section>
            </section>
          )}
          {/* )} */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Tests;
