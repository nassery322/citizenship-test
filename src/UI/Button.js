import './Button.css'


const Button = (props) =>{
    return <button disabled={props.disabled} style={props.style} className={`home-btn ${props.className}`} onClick={props.onClick}>
{props.children}
    </button>
}

export default Button;