import { onAuthStateChanged } from "firebase/auth";
import { Fragment, useEffect, useState } from "react";
import Avatar from "../../../UI/Avatar";
import NavBtn from "../../../UI/NavBtn";
import { auth } from "../../firebase";
import Login from "../Forms/Login";
import ManageAccount from "../Forms/ManageAccount";
import Signup from "../Forms/Signup";
import "./Navbar.css";
import maple from "../../../assets/maple.svg";
const Navbar = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [form, setForm] = useState("login");
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [manageModalIsOpen, setManageModalIsOpen] = useState(false);
  function loginModalPopUp() {
    setModalIsOpen((e) => !e);
  }

  function changeModalHandler() {
    if (form === "login") {
      setForm("signup");
    } else {
      setForm("login");
    }
  }
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && currentUser.uid) {
        setUserIsLoggedIn(true);
      }
    });
  }, [auth.currentUser]);

  function ManageAccountHandler() {
    setManageModalIsOpen((e) => !e);
  }
  const navContent = (
    <Fragment>
      {userIsLoggedIn ? (
        <Fragment>
          <li onClick={ManageAccountHandler}>
            <a className="avatar-canvas">
              <Avatar />
            </a>
          </li>
          <li onClick={props.onPrepTabClose}>
            <a href="#tests" className="nav-link">
              Tests
            </a>
          </li>
          <li onClick={props.onPreparation}>
            <a onClick={props.onPreparation} className="nav-link">
              Preparation
            </a>
          </li>
          <li onClick={props.onPrepTabClose}>
            <a href="#progress" className="nav-link">
              Progress
            </a>
          </li>
        </Fragment>
      ) : (
        <Fragment>
          <li>
            <a href="#home" onClick={props.onPrepTabClose} className="nav-link">
              Home
            </a>
          </li>
          <li onClick={props.onPrepTabClose}>
            <a href="#features" className="nav-link">
              Features
            </a>
          </li>
          <li onClick={props.onPreparation}>
            <a onClick={props.onPreparation} className="nav-link">
              Preparation
            </a>
          </li>
          <li onClick={props.onPrepTabClose}>
            <a href="#about" className="nav-link">
              About
            </a>
          </li>
          <li onClick={props.onPrepTabClose}>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </li>
          <li id="login" onClick={loginModalPopUp}>
            <a href="#" className="nav-link">
              Login
            </a>
          </li>
        </Fragment>
      )}
    </Fragment>
  );
  return (
    <Fragment>
      <nav className="navbar">
        <div className="name-logo">
          <div className="name-logo-content">Citizenship Buddy</div>
          <div>
            <i className="fa-brands fa-canadian-maple-leaf"></i>
          </div>
        </div>
        <ManageAccount
          show={manageModalIsOpen}
          onClick={ManageAccountHandler}
        />
        <div className="navigation-content">
          {form === "login" ? (
            <Login
              onClick={loginModalPopUp}
              onLoginClose={loginModalPopUp}
              show={modalIsOpen}
              onChangeModal={changeModalHandler}
            />
          ) : (
            <Signup
              onClick={loginModalPopUp}
              show={modalIsOpen}
              onChangeModal={changeModalHandler}
            />
          )}
          <ul className="nav-list">{navContent}</ul>
          <div className="nav-button">
            <NavBtn>{navContent}</NavBtn>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
