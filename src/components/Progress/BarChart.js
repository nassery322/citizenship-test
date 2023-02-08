import { Fragment } from "react"
import { Bar } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
const BarChart = (props) =>{
      return  <section className="bar-chart">
        <Bar data={props.data} />
      </section>
    
}

export default BarChart;