import './Button.css'


const Button = (props) =>{
    return <button className='home-btn' onClick={props.onClick}>
{props.children}
    </button>
}

export default Button;