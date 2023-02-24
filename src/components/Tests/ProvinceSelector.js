import { Fragment, useEffect, useState } from "react";
import Button from "../../UI/Button";
import "./ProvinceSelector.css";
import CloseTestContainer from "./CloseTestContainer";
const ProvinceSelector = (props) => {
  const [province, setProvince] = useState("AB");
  const [number, setNumber] = useState(!props.requestNumberOfQuestions && 20);
  const [options, setOptions] = useState([5, 10, 20, 40, 80, "All"]);
  const [closeTestContainer, setCloseTestContainer] = useState(false);
  
  const CanadianProvinces = [
    { name: "Alberta", code: "AB" },
    { name: "British Columbia", code: "BC" },
    { name: "Manitoba", code: "MB" },
    { name: "New Brunswick", code: "NB" },
    { name: "Newfoundland and Labrador", code: "NL" },
    { name: "Northwest Territories", code: "NT" },
    { name: "Nova Scotia", code: "NS" },
    { name: "Nunavut", code: "NU" },
    { name: "Ontario", code: "ON" },
    { name: "Prince Edward Island", code: "PE" },
    { name: "Quebec", code: "QC" },
    { name: "Saskatchewan", code: "SK" },
    { name: "Yukon", code: "YT" },
  ];
  const buttonStyles = { width: "160px", display: "block", margin: "auto" };

  const provinceHandler = (e) => {
    setProvince(e.target.value);
  };
  const numberHandler = (e) => {
    setNumber(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (province) {
      props.province(province);
    }
    if (number) {
      props.numberOfQuestions(number);
    }
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    if (props.category) {
      if (props.category === "geography") {
        setOptions([5, 10, 20, 40, 50, 55]);
      }
      if (props.category === "history") {
        setOptions([5, 10, 20, 40, 80, 145]);
      }
      if (props.category === "government") {
        setOptions([5, 10, 20, 40, 80, 115]);
      }
      if (props.category === "laws") {
        setOptions([5, 10, 20, 40, 50, 60]);
      }
      if (props.category === "symbols") {
        setOptions([5, 10, 20, 40, 50, 55]);
      }
      if (props.category === "economy") {
        setOptions([5, 10, 15, 20, 40, 50,]);
      }
    }
  }, [props.category]);
  const closeHandler = () =>{
    props.onClose(true)
  }
  useEffect(()=>{
    window.history.pushState(null, '', window.location.href);
  },[])
  useEffect(() => {
    
    const handlePopstate = () => {
      props.onClose(true);
    };
  
    window.addEventListener("popstate", handlePopstate);
  
    
  }, [props.onClose]);
  

  return (
    <Fragment>
      
      <div className="close-btn" style={{"fontSize":"3rem"}} onClick={closeHandler}>
        &times;
      </div>
      <section className="province-selector">
        <form>
          {!props.askForProvince && (
            <Fragment>
              <label htmlFor="province">
                {props.requestNumberOfQuestions
                  ? `Please select your province of residence:`
                  : "Please select your province of residence and number of questions:"}
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={provinceHandler}
                defaultValue="AB"
              >
                {CanadianProvinces.map((province) => (
                  <option key={province.code} value={province.code}>
                    {province.name}
                  </option>
                ))}
              </select>
            </Fragment>
          )}
          {!props.requestNumberOfQuestions && (
            <div className="num-questions">
              {props.askForProvince && (
                <label htmlFor="questions-amount">
                  Please select the number of questions.
                </label>
              )}

              <select
                className="form-select"
                name="questions-amount"
                defaultValue="20"
                onChange={numberHandler}
              >
                {options.map((option, index) => (
                  <option key={index} value={option === 'All'? 'all' : option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
          <Button onClick={submitHandler} style={buttonStyles}>
            Start Test
          </Button>
        </form>
      </section>
    </Fragment>
  );
};

export default ProvinceSelector;
