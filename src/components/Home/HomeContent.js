import { Fragment, useState } from "react";
import Button from "../../UI/Button";
import "./HomeContent.css";
import maple from "../../assets/leaf.png";
import Signup from "./Forms/Signup";
import Transition from "react-transition-group/Transition";
import Login from "./Forms/Login";
import multiavatar from '@multiavatar/multiavatar/esm'


const HomeContent = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [form, setForm] = useState('signup')
  function signupModalPopUp() {
    setModalIsOpen((e) => !e);
  }
  function changeModalHandler(event){
    if(form === 'signup'){
      setForm('login')
    }else{
      setForm('signup')
    }
    if(event === 'login'){
      setForm('login')
      signupModalPopUp()
    }
  }

  const loginModalHandler = () =>{
    setForm('login')
    signupModalPopUp()
  }
  return (
    <Fragment>
      <section className="home-content">
        <section className="home-quotes">
          <p className="home-quote">
            Become a Canadian Citizen with our advanced online test prep
            platform.
          </p>
          <p className="home-quote2">
            Create an account to Ace the test and take a step closer to becoming
            a proud Canadian citizen.
          </p>
          <div className="home-buttons">
            <Button onClick={signupModalPopUp}>Create Account</Button>
            <button onClick={loginModalHandler} className={'check-btn'} style={{'width': '170px', 'margin':'20px'}}>Login</button>
           {form === 'signup' ? <Signup  onClick={signupModalPopUp} show={modalIsOpen}  onChangeModal={changeModalHandler}/> : <Login onLoginClose={signupModalPopUp} onClick={signupModalPopUp} show={modalIsOpen}  onChangeModal={changeModalHandler}/>}
            
          </div>
        </section>
        <section className="home-image">
          <img src={maple} alt="Maple leaf!" />
        </section>
      </section>
    </Fragment>
  );
};

export default HomeContent;
