import React, { Fragment } from "react";
import Signup from "./Forms/Signup";
import "./Home.css";
import HomeContent from "./HomeContent";
import Navbar from "./Navbar/Navbar";

const Home = (props) => {
  function hideNavHandler(e){
props.hideNav(e)
  }
  return (
    <Fragment>
      <section className="home">
        <HomeContent hideNav={hideNavHandler} />
      </section>
    </Fragment>
  );
};

export default Home;
