import { Fragment, useEffect, useState } from "react";
import "./App.css";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Features from "./components/Features/Features";
import { auth } from "./components/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Home from "./components/Home/Home";
import Tests from "./components/Tests/Tests";
import ProvinceSelector from "./components/Tests/ProvinceSelector";
function App() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [provinceIsSelected, setProvinceIsSelected] = useState(true);
  const [province, setProvince] = useState(null);
  const [aa, setaa] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && currentUser.uid) {
        setUserIsLoggedIn(true);
      }
    });
  }, [auth.currentUser]);

  function askForProvinceHandler(e) {
    setProvinceIsSelected(false);
  }
  function provinceSelectHandler(province) {
    setProvince(province);
    setProvinceIsSelected(true);
  }
// function retakeHandler(){
// setaa(true)
// }

  return (
    <div className="App">
      {userIsLoggedIn ? (
        <Fragment>
          {provinceIsSelected ? (
            <Tests askForProvince={askForProvinceHandler} province={province && province} />
          ) : (
            <ProvinceSelector province={provinceSelectHandler} />
          )}{" "}
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
