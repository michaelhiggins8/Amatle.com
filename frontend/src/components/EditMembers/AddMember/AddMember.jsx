import React from 'react'
import "./AddMember.css";
import AddMemberCard from './AddMemberCard/AddMemberCard';
import { useState } from 'react';
export default function AddMember() {


const [showCard,setShowCard] = useState(false);




  return (
    <div>
        


<button onClick={()=>setShowCard(!showCard)}>➕ Add Member </button>

{showCard && <AddMemberCard setShowCard = {setShowCard}/>}



    </div>
  )
}
