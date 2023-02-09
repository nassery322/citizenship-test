import { useState, useEffect } from "react";
import "./Avatar.css";
import { auth, firebaseDatabase } from "../components/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Avatar = (props) => {
    const [username, setUsername] = useState('')
  const fetchData = async (id) => {
    const response = await fetch(`${firebaseDatabase}/userdata/${id}.json`);
    const data = await response.json();
    setUsername(data.name + data.lastname)
  };
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser.uid) {
        fetchData(currentUser.uid);
      }
    });
  },[auth]);
  const emptyUserAvatar = `https://firebasestorage.googleapis.com/v0/b/connected-c86f2.appspot.com/o/images%2F0.30428627623556603?alt=media&token=7eb142a5-07a8-4a37-aefa-a3e994bdaf51`
  return (
    <img
      src={username? `https://api.multiavatar.com/${username}.png` : emptyUserAvatar}
      alt="user avatar"
      className="avatar"
    />
  );
};

export default Avatar;
