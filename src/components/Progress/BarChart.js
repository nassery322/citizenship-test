import { Fragment, useEffect,useState } from "react"
import './BarChart.css'
import { Bar } from 'react-chartjs-2'
import { Line,  } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'

const BarChart = (props) =>{
    const [barThickness, setBarThickness] = useState(40)
    useEffect(()=>{
        if(window.innerWidth < 600){
            setBarThickness(20)
        }
    },[window.innerWidth])
      return  <section className="bar-chart">
        <div><Bar data={props.data} options={{barThickness: barThickness, }}/></div>
        <div className="average-score">Average Score
        <div className="results-pie animate no-round "
          style={{ "--p": `${props.data.average}` }}>{props.data.average.toFixed(0)}%</div>
        </div>
        
        
      </section>
    
}

export default BarChart;