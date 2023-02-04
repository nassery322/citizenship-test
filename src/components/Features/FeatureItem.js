import { Fragment } from 'react'
import './FeatureItem.css'

const FeatureItem = (props) =>{
    return <div className='feature-item'>

        <div className='feature-image'><img src={props.image} alt='Feature image'/></div>
        <header>{props.header}</header>
        <div className='feature-description'>
        {props.description}
        </div>
    </div>
}

export default FeatureItem;