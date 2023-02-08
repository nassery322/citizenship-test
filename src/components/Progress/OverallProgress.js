import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, firebaseDatabase } from "../firebase";
import BarChart from "./BarChart";
import "./OverallProgress.css";

const OverallProgress = () => {
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && currentUser.uid) {
        const response = await fetch(
          `${firebaseDatabase}/usersprogress/${currentUser.uid}/overallProgress.json`
        );
        const data = await response.json();
        let loadedData = [];
        for (const key in data) {
          loadedData.push(data[key]);
        }
        console.log(data);
        setChartData({
          labels: [1, 2, 3, 4, 5, 6, 7],
          datasets: [{ label: "overall progress", data: loadedData.reverse() }],
        });
      }
    });
  }, [auth.currentUser]);
  return <section className="overall-progress">
    {chartData && <BarChart data={chartData} />}
  </section>;
};

export default OverallProgress;