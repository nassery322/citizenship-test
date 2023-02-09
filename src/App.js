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
function App() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [provinceIsSelected, setProvinceIsSelected] = useState(true);
  const [province, setProvince] = useState(null);
  const [testIsStarted, setTestIsStarted] = useState(false);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      setInterval(() => {
        setLoading(false)
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
  const testHandler = (event) => {
    setTestIsStarted(event);
  };

  return (
    <div className="App">
      {!loading && <Fragment>
      {!testIsStarted && provinceIsSelected && <Navbar /> }
      {userIsLoggedIn ? (
        <Fragment>
          {provinceIsSelected ? (
            <Tests
              askForProvince={askForProvinceHandler}
              testIsStarted={testHandler}
              province={province && province}
            />
          ) : (
            <ProvinceSelector
              onClose={askForProvinceHandler}
              province={provinceSelectHandler}
            />
          )}
          {!testIsStarted && provinceIsSelected && (
            <Fragment>
              <Preparation />
              <Progress />
            </Fragment>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <Home />
          <Features />
          <Preparation />
          <About />
          <Contact />
        </Fragment>
        
      )}
      </Fragment>}
    </div>
  );
}

export default App;
