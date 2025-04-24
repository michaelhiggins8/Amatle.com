import React from 'react'
import "./AddMember.css"
import { useState } from 'react'
import NewMemberInfoInputCard from './NewMemberInfoInputCard/NewMemberInfoInputCard'
export default function AddMember() {

  const [showCard,setShowCard] = useState(false)

    
       
  return (
    <div className='add-member'>
        {showCard && <NewMemberInfoInputCard/>}
        <button onClick={()=>setShowCard(!showCard)}>➕ Add member</button>

    </div>
  )
}
