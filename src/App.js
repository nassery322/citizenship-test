import { Fragment, useEffect, useState } from "react";
import "./App.css";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Features from "./components/Features/Features";
import { auth } from "./components/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Home from "./components/Home/Home";
import Tests from "./components/Tests/Tests";

function App() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && currentUser.uid) {
        setUserIsLoggedIn(true);
      }
    });
  }, [auth.currentUser]);
  return (
    <div className="App">
      {userIsLoggedIn ? (
        <Fragment>
          <Tests />
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
