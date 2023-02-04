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
  });

  return (
    <img
      src={`https://api.multiavatar.com/${username}.png`}
      alt="user avatar"
    />
  );
};

export default Avatar;
