import React from 'react'
import "./Admin.css"
import { Link } from 'react-router-dom'
export default function Admin() {
  return (
    <ul className = 'admin-nav-menu'>
    


        <li><Link to = "/doc_update">Update Rules</Link></li>

        <li><Link to = "/make_query">Get Answer</Link></li>

        <li><Link to = "/payment">Payment</Link></li>   
        
        <li><Link to = "/edit_members">Edit Members</Link></li>   

        

        </ul>  
  )
}
