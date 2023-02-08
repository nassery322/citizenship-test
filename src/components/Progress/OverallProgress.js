import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, firebaseDatabase } from "../firebase";
import BarChart from "./BarChart";
import Graph from "./Graph";
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
          labels.push(Number(key) + 1 +'th test');
          loadedData.push(data[key]);
        }
        console.log(data);
        setChartData({
            labels: labels,
            datasets: [{ 
              label: " Overall Progress Based on Last 7 Tests", 
              data: loadedData.reverse(), 
              backgroundColor: "#d22a2a", 
              borderColor: 'black',
              borderWidth:1
            }],
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    suggestedMax: 100
                  }
                }]
              }
            }
          });
          
          
      }
    });
  }, [auth.currentUser]);
  
  return <section className="overall-progress">
    {chartData && <BarChart data={chartData} />}
    {chartData && <Graph data={chartData} />}
  </section>;
};

export default OverallProgress;
