import "./CloseTestContainer.css";

import Modal from "../../UI/Modal";

const CloseTestContainer = (props) => {
  return (
    <Modal show={props.show} style={{'top': '30%'}} onClick={props.onClose} >
        <div className="close-btn" onClick={props.onClose}>&times;</div>
      <section className="close-container">
        <section className="close-container-question">
        Are you Sure you want to quit? any unsaved progress well be lost.
        </section>
        <button className="modal-btn" onClick={props.onCloseContainer}>Yes</button>
        <button className="modal-btn" onClick={props.onClose}>No</button>
      </section>
    </Modal>
  );
};

export default CloseTestContainer;
