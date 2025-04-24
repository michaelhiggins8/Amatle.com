import React from 'react'
import "./Member.css"
import { Link } from 'react-router-dom'

export default function Member() {
  return (
    <ul className = 'nav-menu'>
    
        <li><Link to = "/make_query">Get Answer</Link></li>
        <li><Link to = "/edit_profile">Edit Profile</Link></li>

         
        </ul>  
  )
}
