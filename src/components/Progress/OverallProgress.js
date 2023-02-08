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
        let labels = [];
        for (const key in data) {
          labels.push(Number(key) + 1);
          loadedData.push(data[key]);
        }
        console.log(data);
        setChartData({
          labels: labels,
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
