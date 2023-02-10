import { Fragment, useEffect, useState } from "react";
import Button from "../../UI/Button";
import "./ProvinceSelector.css";

const ProvinceSelector = (props) => {
  const [province, setProvince] = useState("AB");
  const [number, setNumber] = useState(!props.requestNumberOfQuestions &&  5)
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
  const numberHandler = (e) =>{
    setNumber(e.target.value)
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if (province) {
      props.province(province);
    }
    if(number){
      props.numberOfQuestions(number)
    }
  };
 

  return (
    <Fragment>
      <div className="close-btn" onClick={props.onClose}>
        &times;
      </div>
      <section className="province-selector">
        <form>
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
          <div className="num-questions">
            {!props.requestNumberOfQuestions && (
              <select className="form-select" defaultValue="AB" onChange={numberHandler}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="40">40</option>
                <option value="80">80</option>
                <option value="all">All</option>
              </select>
            )}
          </div>
          <Button onClick={submitHandler} style={buttonStyles}>
            Start Test
          </Button>
        </form>
      </section>
    </Fragment>
  );
};

export default ProvinceSelector;
