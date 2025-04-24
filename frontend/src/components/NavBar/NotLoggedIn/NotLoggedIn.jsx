import React from 'react'
import { Link } from 'react-router-dom'
import "./NotLoggedIn.css"
import logo from "../../../assets/images/logo.png";
export default function NotLoggedIn() {
  return (
    
    <ul className = 'not-in-nav-menu'>
     
    <li className='home-button'><Link to = "/"><img src = {logo}></img></Link></li>
    <li className='log-in-button'> <Link to = "log_in">Log In</Link></li> 
    <li className='sign-up-button'><Link to = "/sign_up">Get Started</Link></li>
   
    
  
    </ul>  
        
  )
}
