import { Fragment, useEffect, useState } from "react";
import "./App.css";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Features from "./components/Features/Features";
import { auth } from "./components/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Home from "./components/Home/Home";
import Tests from "./components/Tests/Tests";
import TestContainer from "./components/Tests/TestContainer";
import ProvinceSelector from "./components/Tests/ProvinceSelector";

function App() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [provinceIsSelected, setProvinceIsSelected] = useState(true)
  const [province, setProvince] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && currentUser.uid) {
        setUserIsLoggedIn(true);
      }
    });
  }, [auth.currentUser]);
  function provinceHandler(){
    setProvinceIsSelected(false)
  }
  function provinceChangeHandler(code){
    setProvinceIsSelected(true)
    setProvince(code)
  }
  return (
    <div className="App">
      {userIsLoggedIn ? (
        <Fragment>
          {provinceIsSelected? <Tests askForProvince={provinceHandler} province={province && province}  /> : <ProvinceSelector province={provinceChangeHandler} />}
          {/* <TestContainer /> */}
        </Fragment>
      ) : (
        <Fragment>
          <Home />
          <Features />
          <About />
          <Contact />
        </Fragment>
      )}
    </div>
  );
}

export default App;
