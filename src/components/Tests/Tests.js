import { Fragment } from "react";
import TestItem from "./TestItem";
import "./Tests.css";
import citizenCert from "../../assets/citizencert.jpg";
import geography from '../../assets/geography.jpg'
import history from '../../assets/history.jpg'
import government from '../../assets/politics.jpg'
import law from '../../assets/law.jpg'
import symbols from '../../assets/symbols.jpg'
import Navbar from "../Home/Navbar/Navbar";
const Tests = () => {
    const testsArray = [
        {
          id: "t1",
          title: "Simulation Test",
          description: "Our simulation test replicates the format of the real Canadian Citizenship Test. It draws questions from every categories and are also timed which helps to further prepare you.",
          image: citizenCert,
        },
        {
          id: "t2",
          title: "Geography Test",
          description: "A test focusing on Canadian geography and demographics. This test covers topics such as the physical geography of Canada, major cities and provinces, and demographic information.",
          image: geography,
        },
        {
          id: "t3",
          title: "History and Heritage Test",
          description: "A test focusing on Canadian history and heritage. This test covers topics such as important historical events, famous Canadians, and cultural heritage.",
          image: history,
        },
        {
          id: "t4",
          title: "Political and Social Systems Test",
          description: "A test focusing on Canadian political and social systems. This test covers topics such as the parliamentary system, the role of the Prime Minister, and Canadian values.",
          image: government,
        },
        {
          id: "t5",
          title: "Laws and Rights Test",
          description: "A test focusing on Canadian laws, rights, and freedoms. This test covers topics such as the Canadian Charter of Rights and Freedoms, criminal law, and the justice system.",
          image: law,
        },
        {
          id: "t6",
          title: "Symbols and Traditions Test",
          description: "A test focusing on Canadian symbols, holidays, and traditions. This test covers topics such as the Canadian flag, national anthem, and important holidays.",
          image: symbols,
        },
      ];

  return (
    <Fragment>
      <section className="tests-section">
        <Navbar />
        <section className="test-items">
         {testsArray.map( (test) => <TestItem key={test.id} title={test.title} description={test.description} image={test.image} /> )}
        </section>
      </section>
    </Fragment>
  );
};

export default Tests;
