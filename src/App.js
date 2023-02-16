import { Fragment, useEffect, useState, useSyncExternalStore } from "react";
import "./App.css";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Features from "./components/Features/Features";
import { auth } from "./components/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Home from "./components/Home/Home";
import Tests from "./components/Tests/Tests";
import ProvinceSelector from "./components/Tests/ProvinceSelector";
import Preparation from "./components/Preparation/Preparation";
import Navbar from "./components/Home/Navbar/Navbar";
import Progress from "./components/Progress/Progress";
import { Router } from "react-router-dom";
function App() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [provinceIsSelected, setProvinceIsSelected] = useState(true);
  const [province, setProvince] = useState(null);
  const [testIsStarted, setTestIsStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [numberOfQuestions, setNumberOfQuestions] = useState(null);
  const [preparationTabIsOpen, setPreparationTabIsOpen] = useState(false);
  const [numberOfQuestionsSelected, setNumberOfQuestionsSelected] =
    useState(true);
  const [askForProvince, setAskForProvince] = useState(false);
  const [category, setCategory] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      setInterval(() => {
        setLoading(false);
      }, 100);
      if (currentUser && currentUser.uid) {
        setUserIsLoggedIn(true);
      }
    });
  }, [auth]);

  function askForProvinceHandler() {
    setProvinceIsSelected((e) => !e);
  }
  function provinceSelectHandler(province) {
    setProvince(province);
    setProvinceIsSelected(true);
    
  }
  function askForNumberOfQuestionsHandler(category) {
    setNumberOfQuestionsSelected((e) => !e);
    setCategory(category);
  }
  function numberOfQuestionsHandler(num) {
    setNumberOfQuestions(num);
    setNumberOfQuestionsSelected(true);
  }
  const testHandler = (event) => {
    setTestIsStarted(event);
    
  };
  const preparationTabHandler = () => {
    setPreparationTabIsOpen(true);
  };
  const prepTabCloseHandler = () => {
    setPreparationTabIsOpen(false);
  };

  const provinceSelectorCloseHandler = () =>{
    setProvinceIsSelected(true)
    
    setNumberOfQuestionsSelected(true)
  }
  return (
    <div className="App">
      {!loading && (
        <Fragment>
          {!testIsStarted &&
            provinceIsSelected &&
            numberOfQuestionsSelected && (
              <Navbar
                onPrepTabClose={prepTabCloseHandler}
                onPreparation={preparationTabHandler}
              />
            )}
          {userIsLoggedIn ? (
            <Fragment>
              {provinceIsSelected && numberOfQuestionsSelected ? (
                !preparationTabIsOpen && (
                  <Tests
                    askForProvince={askForProvinceHandler}
                    testIsStarted={testHandler}
                    askForNumberOfQuestions={askForNumberOfQuestionsHandler}
                    province={province && province}
                    numberOfQuestions={numberOfQuestions}
                  />
                )
              ) : (
                <ProvinceSelector
                  askForProvince={provinceIsSelected}
                  category={category}
                  onClose={provinceSelectorCloseHandler}
                  province={provinceSelectHandler}
                  requestNumberOfQuestions={numberOfQuestionsSelected}
                  numberOfQuestions={numberOfQuestionsHandler}
                />
              )}
              {!testIsStarted && provinceIsSelected && (
                <Fragment>
                  {preparationTabIsOpen ? <Preparation onClose={prepTabCloseHandler}/> : <Fragment><Progress /></Fragment>}
                </Fragment>
              )}
            </Fragment>
          ) : (
            <Fragment>
              {!preparationTabIsOpen ? (
                <Fragment>
                  <Home hideNav={testHandler}/>
                  {!testIsStarted && <Fragment>
                  <Features />
                  <About />
                  <Contact />
                  </Fragment>}
                  
                </Fragment>
              ) : (
                <Preparation onClose={prepTabCloseHandler}/>
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
}

export default App;
