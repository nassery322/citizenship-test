import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, firebaseDatabase } from "../firebase";
import BarChart from "./BarChart";
import Graph from "./Graph";
import "./OverallProgress.css";

const OverallProgress = (props) => {
  const [chartData, setChartData] = useState(null);
  const [average, setAverage] = useState(0)
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

        const sum = loadedData.reduce((total, value) => total + parseInt(value), 0) / loadedData.length
        setAverage(sum)
        setChartData({
            average: sum,
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
          if(labels.length < 1){
            props.progressIsEmpty(true)
          }
          
          
      }
    });
  }, [auth.currentUser]);
  return <section className="overall-progress">
        
    
    {chartData && chartData.labels.length > 1 && <BarChart data={chartData} />}
    {chartData && chartData.labels.length > 1 && <Graph data={chartData} />}
  </section>;
};

export default OverallProgress;
