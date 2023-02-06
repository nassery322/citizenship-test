import { Fragment, useEffect, useState } from "react";
import Button from "../../UI/Button";
import "./ProvinceSelector.css";

const ProvinceSelector = (props) => {
  const [province, setProvince] = useState('AB');
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
    // props.province(e.target.value);
};

  const submitHandler = (e) => {
    e.preventDefault();
    if (province) {
      props.province(province);
    }
  };
//  useEffect(()=>{
//     props.province(province)
//  },[])


  return (<Fragment>
    <div className="close-btn">&times;</div>
    <section className="province-selector">
      <form>
        <label htmlFor="province">
          Please select your province of residence:
        </label>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={provinceHandler}
          defaultValue='AB'
        >
          {CanadianProvinces.map((province) => (
            <option key={province.code} value={province.code}>
              {province.name}
            </option>
          ))}
        </select>
        <Button onClick={submitHandler} style={buttonStyles}>
          Start Test
        </Button>
      </form>
    </section>
    </Fragment>
  );
};

export default ProvinceSelector;
