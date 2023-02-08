import { Line } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import './Graph.css'

const Graph = (props) =>{
    return <section className='graph'>
        <Line data={props.data} />
    </section>
}

export default Graph