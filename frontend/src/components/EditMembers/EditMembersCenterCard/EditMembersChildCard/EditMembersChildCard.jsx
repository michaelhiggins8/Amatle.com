import React from 'react'
import "./EditMembersChildCard.css";
import { Link } from 'react-router-dom'
export default function EditMembersChildCard({hedr,lnk,url,btnTxt}) {
  console.log(lnk)
    return (
    <div className='edit-members-child-card'>
        
<h1>{hedr}</h1>

<Link to = {lnk}>{btnTxt}</Link>
<img src = {url}></img>

    </div>
  )
}
