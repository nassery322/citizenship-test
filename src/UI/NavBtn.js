import { Fragment, useEffect, useRef, useState } from "react";
import "./NavBtn.css";

const NavBtn = (props) => {
  const inputRef = useRef(null);
  const [check, setCheck] = useState(false)
  const checkbox = inputRef.current;
  const [showBackButton, setShowBackButton] = useState(false);

  useEffect(() => {
    const navBtnHandlers = document.querySelectorAll(".nav-link");
    navBtnHandlers.forEach((btn) => {
      btn.addEventListener("click", () => {
        inputRef.current.checked = false;
      });
    });
    
    const handleCheckboxChange = () => {
      if (inputRef.current.checked) {
        window.history.pushState(null, '', window.location.href);
      }
      setShowBackButton(inputRef.current.checked);
    };
    inputRef.current.addEventListener('change', handleCheckboxChange);

    window.addEventListener("popstate", () => {
      inputRef.current.checked = false;
      setShowBackButton(false);
    });

    
  }, []);

  return (
    <Fragment>
      <input type="checkbox" id="active" ref={inputRef}/>

      <label htmlFor="active" className="menu-btn">
        <span></span>
      </label>
      <label htmlFor="active" className="close"></label>
      <div className="wrapper">
        <ul>{props.children}</ul>
      </div>
    </Fragment>
  );
};

export default NavBtn;
