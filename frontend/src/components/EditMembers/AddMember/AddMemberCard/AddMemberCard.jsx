import React from 'react'
import "./AddMemberCard.css"
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useState } from 'react';
export default function AddMemberCard({setShowCard}) {

const [email,setEmail] = useState(null);
const [cellNumber,setCellNumber] = useState(null);


const addMember = async () =>{


  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_ORIGIN + "/addMember", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, cellNumber }),
      credentials: "include"
    });

    if (!response.ok) {
      console.error("Server error:", response.status);
      return;
    }
    console.log("email state:", email);
    console.log("fetch response:", response);

    const result = await response.json();
    console.log(result.message);
    console.log(email); // or console.log(result.message);


    window.location.reload(); // this will now definitely fire
  } catch (error) {
    console.error("Failed to add member:", error);
  }



  
   }
   








  return (
    <div className='add-member-card'>
        
    <button className='exit-button' onClick={()=>setShowCard(false)}>❌</button>
    <input placeholder='email' onChange={(e)=>setEmail(e.target.value)}></input>
   
    
    <div>
    <PhoneInput
      country={'us'} 
      value={cellNumber}
      onChange={(phone) => setCellNumber(phone)}
    />
    </div>
    <button className='add-button' onClick={()=>addMember()}>Add</button>

    </div>
  )
}
