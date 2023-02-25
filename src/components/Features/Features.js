import React, { Fragment } from "react";
import FeatureItem from "./FeatureItem";
import "./Features.css";
import accuracySvg from '../../assets/accuracy.svg'
import questionsSvg from "../../assets/questions.svg";
import categoriesSvg from '../../assets/categories.svg';
import chartsSvg from '../../assets/charts.svg';
import cashSvg from '../../assets/cash.svg';
import happyFaceSvg from '../../assets/happyface.svg'
const websiteFeatures = [
    {
        id: "f1",
        header: "Highly Accurate",
        image: accuracySvg,
        description:
          "Our website is designed to provide you with a comprehensive and accurate simulation of the official Canadian Citizenship Test",
      },
  {
    id: "f2",
    header: "Over 550+ Questions",
    image: questionsSvg,
    description:
      "Practice with 550+ test questions including multiple choice and true or false questions.",
  },
  {
    id: "f3",
    header: "Customized Test Categories",
    image: categoriesSvg,
    description:
      "Choose from a variety of categories for targeted practice in your areas of need.",
  },
  {
    id: "f4",
    header: "Track Your Progress",
    image: chartsSvg,
    description:
      "Track your progress with our user friendly graphs and charts.",
  },
  {
    id: "f5",
    header: "Free",
    image: cashSvg,
    description:
      "Get unlimited access to all of our Canadian Citizenship Test preparation materials for free.",
  },
  {
    id: "f6",
    header: "User-Friendly Interface",
    image: happyFaceSvg,
    description:
      "Our website offers a user-friendly interface with an intuitive design and easy navigation for an effortless and enjoyable experience. ",
  },
];
const Features = () => {
  return (
    <Fragment>
      <section className="features" id="features">
        <header>Features</header>
        <section className="feature-items">
          {websiteFeatures.map((feature) => <FeatureItem key={feature.id} image={feature.image} header={feature.header} description={feature.description} />)}
        </section>
      </section>
    </Fragment>
  );
};

export default Features;
