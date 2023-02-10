import ReactDOM from "react-dom";
import React from "react";
import "./Modal.css";
import CSSTransition from "react-transition-group/CSSTransition";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClick} />;
};

const Overlay = (props) => {
  const animationTiming = {
    enter: 400,
    exit: 1000,
  };
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.show}
      timeout={animationTiming}
      classNames={{
        enter: "",
        enterActive: "ModalOpen",
        exit: "",
        exitActive: "ModalClosed",
      }}
    >
      <div className="modal" style={props.style}>
        <div className="modal-content">{props.children}</div>
      </div>
    </CSSTransition>
  );
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show &&
        ReactDOM.createPortal(
          <Backdrop onClick={props.onClick} />,
          document.getElementById("overlay")
        )}

      {ReactDOM.createPortal(
        <Overlay show={props.show} style={props.style}>
          {props.children}
        </Overlay>,
        document.getElementById("overlay")
      )}
    </React.Fragment>
  );
};

export default Modal;
