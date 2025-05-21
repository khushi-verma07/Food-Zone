import React, {useState} from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';

const LoginPopup = ({setShowLogin}) => {

  const [currState, setcurrState] = useState("Sign-up");
  

  return (
    <div className='login-popup'>
      <form className='login-popup-container'>
      <div className="login-popup-title">
      <h2>{currState}</h2>
      <img onClick={()=>setShowLogin(false)} src={assets.cross_icon}/>
      </div>
      <div className="login-popup-inputs">
       {currState==='Login'?<></>: <input type='text' placeholder='Your name' required />}
        <input type='email' placeholder='your email' required />
        <input type='password' placeholder='password' required />
      </div>
      <button>{currState==='Sign-up'?"Create account":"Login"}</button>
      <div className="login-popup-condition">
        <input type='checkbox' required/>
        <p>By continuing</p>
        </div>
      </form>
    </div>
  )
}

export default LoginPopup
