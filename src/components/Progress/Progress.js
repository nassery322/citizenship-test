import { Fragment } from 'react'
import OverallProgress from './OverallProgress';
import './Progress.css'
import ProgressByCategory from './ProgressByCategory';


const Progress = () =>{
    return <Fragment>
        <section className='progress' id='progress'>
        <OverallProgress />
        <ProgressByCategory />
        </section>
    </Fragment>
}

export default Progress;