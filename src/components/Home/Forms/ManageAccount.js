import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import Avatar from "../../../UI/Avatar";
import Modal from "../../../UI/Modal";
import { auth, firebaseDatabase } from "../../firebase";
import "./ManageAccount.css";

const ManageAccount = (props) => {
  const [username, setUsername] = useState("");
  const fetchData = async (id) => {
    const response = await fetch(`${firebaseDatabase}/userdata/${id}.json`);
    const data = await response.json();
    setUsername(`${data.name} ${data.lastname}`);
  };
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && currentUser.uid) {
        fetchData(currentUser.uid);
      }
    });
  }, [auth.currentUser]);
  async function signoutHandler() {
    await signOut(auth);
    window.location.reload();
  }
  return (
    <Modal show={props.show} onClick={props.onClick} style={{'top':'20%'}}>
      <div className="close-btn" onClick={props.onClick}>
        &times;
      </div>
      <div className="avatar-canvas-manage">
        <Avatar />
        {username}
        <button className="signout-btn" onClick={signoutHandler}>
          Sign Out
        </button>
      </div>
    </Modal>
  );
};

export default ManageAccount;
