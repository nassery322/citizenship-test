import { Fragment } from 'react'
import OverallProgress from './OverallProgress';
import './Progress.css'


const Progress = () =>{
    return <Fragment>
        <section className='progress' id='progress'>
        <OverallProgress />
        </section>
    </Fragment>
}

export default Progress;