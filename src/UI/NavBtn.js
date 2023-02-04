import { Fragment, useEffect, useRef } from 'react'
import './NavBtn.css'


const NavBtn = props =>{
  const inputRef = useRef(null);
  useEffect(() => {
    const checkbox = inputRef.current;
    const navBtnHandlers = document.querySelectorAll(".nav-link");
    navBtnHandlers.forEach(btn => {
      btn.addEventListener("click", () => {
        checkbox.checked = false; 
      });
    });
  }, []);
 

    return <Fragment>
        <input type="checkbox" id="active" ref={inputRef}/>

    <label htmlFor="active" className="menu-btn"><span></span></label>
    <label htmlFor="active" className="close"></label>
    <div className="wrapper">
      <ul>
    {props.children}
    </ul>
    </div>
    </Fragment>
}


export default NavBtn;