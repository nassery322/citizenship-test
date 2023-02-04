import React, { Fragment } from "react";
import Signup from "./Forms/Signup";
import "./Home.css";
import HomeContent from "./HomeContent";
import Navbar from "./Navbar/Navbar";

const Home = () => {
  return (
    <Fragment>
      <section className="home">
        <Navbar />
        <HomeContent />
      </section>
    </Fragment>
  );
};

export default Home;
