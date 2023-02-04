import Modal from "../../../UI/Modal";
import "./Signup.css";
import React, { useState, useRef, useEffect } from "react";
import { auth, firebaseDatabase } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const Signup = (props) => {
  const [isloading, setIsLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    passwordconfirm: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    passwordconfirm: "",
  });

  async function submitHandler(event) {
    event.preventDefault();

    let hasErrors = false;
    if (formValues.name.trim() === "") {
      hasErrors = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name is required",
      }));
    }
    if (formValues.lastname.trim() === "") {
      hasErrors = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastname: "Last name is required",
      }));
    }
    if (formValues.email.trim() === "") {
      hasErrors = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email)
    ) {
      hasErrors = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address",
      }));
    }
    if (formValues.password.trim() === "") {
      hasErrors = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
    } else if (formValues.password.trim().length < 8) {
      hasErrors = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is shorter than 8 character",
      }));
    }
    if (formValues.passwordconfirm.trim() === "") {
      hasErrors = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordconfirm: "Password confirmation is required",
      }));
    } else if (formValues.passwordconfirm !== formValues.password) {
      hasErrors = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordconfirm: "Passwords do not match",
      }));
    }

    let userId;
    if (!hasErrors) {
      setIsLoading(true);
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          formValues.email,
          formValues.password
        );

        const response = await fetch(
          `${firebaseDatabase}/userdata/${user.user.uid}.json`,
          {
            method: "PUT",
            body: JSON.stringify({
              name: formValues.name,
              lastname: formValues.lastname,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        props.onSignupClose(true);
      } catch (error) {
        console.log(error.message);
      }
      setIsLoading(false);
    }
  }

  function changeHandler(event) {
    const { name, value } = event.target;
    setErrors("");
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }
async function singouthandler(){
await signOut(auth)
}
  return (
    <Modal onClick={props.onClick} show={props.show}>
      <div className="close-btn" onClick={props.onClick}>
        &times;
      </div>
      <form className="signup-form" onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={changeHandler}
            value={formValues.name}
            placeholder=" Enter your Name"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            onChange={changeHandler}
            value={formValues.lastname}
            placeholder=" Enter your Last Name"
          />
          {errors.lastname && <p className="error">{errors.lastname}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="example@mail.com"
            type="email"
            id="email"
            name="email"
            onChange={changeHandler}
            value={formValues.email}
          />
          <span class="highlight"></span>
          <span class="bar"></span>
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={changeHandler}
            value={formValues.password}
            placeholder=" Enter your Password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="passwordconfirm">Confirm your password:</label>
          <input
            type="password"
            id="passwordconf"
            name="passwordconfirm"
            onChange={changeHandler}
            value={formValues.passwordconfirm}
            placeholder=" Confirm your Password"
          />
          {errors.passwordconfirm && (
            <p className="error">{errors.passwordconfirm}</p>
          )}
        </div>

        <button type="submit" className="form-submit-btn" >
          {isloading ? "Signing up" : "Sign up"}
        </button>
        <button onClick={singouthandler}>Signout</button>
        <p style={{'textAlign':'center'}}>Already have an account? <a className="modal-change-btn" onClick={props.onChangeModal}>Click Here</a></p>
      </form>
    </Modal>
  );
};

export default Signup;
