import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBAwCVOfjbhRSSAg1GqWwB2ZKCWV_DQTJM",
  authDomain: "citizenshiptest-3407a.firebaseapp.com",
  databaseURL: "https://citizenshiptest-3407a-default-rtdb.firebaseio.com",
  projectId: "citizenshiptest-3407a",
  storageBucket: "citizenshiptest-3407a.appspot.com",
  messagingSenderId: "436876524126",
  appId: "1:436876524126:web:538751f900d45ceefc52cf",
  };
  

const app = initializeApp(firebaseConfig);
export const firebaseDatabase = firebaseConfig.databaseURL;
export const auth = getAuth(app)