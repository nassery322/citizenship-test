import "./Login.css";
import React, { useRef, useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Modal from "../../../UI/Modal";
const Login = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();
    
    setError("");
    if (emailRef.current.value.length === 0) {
      setError("please input your E-Mail in the field");
      return;
    }
    if (passwordRef.current.value.length === 0) {
      setError("please input your password in the field");
      return;
    }
    setIsLoading(true);

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      props.onLoginClose(true);
    } catch (error) {
      console.log(error.message);
      setError("Invalid E-Mail address or password!");
    }
    setIsLoading(false);
  }
  function changeHandler() {
    setError("");
  }

  return (
    <Modal onClick={props.onClick} show={props.show}>
      <div onClick={props.onClick} className='close-btn'>&times;</div>

      <form className="login-form" onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            onChange={changeHandler}
            placeholder=" Enter your E-Mail"
            ref={emailRef}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            onChange={changeHandler}
            placeholder=" Enter your Password"
            ref={passwordRef}
          />
        </div>

        <p className="error">{error}</p>
        <button className="form-submit-btn">{isLoading ? "Logging in" : "Log in"}</button>
      <p style={{'textAlign':'center'}}>Don't have an account? <a className="modal-change-btn" onClick={props.onChangeModal}>Create account now</a></p>
      </form>
    </Modal>
  );
};

export default Login;
