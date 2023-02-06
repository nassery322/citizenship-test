import './Button.css'


const Button = (props) =>{
    return <button style={props.style} className='home-btn' onClick={props.onClick}>
{props.children}
    </button>
}

export default Button;