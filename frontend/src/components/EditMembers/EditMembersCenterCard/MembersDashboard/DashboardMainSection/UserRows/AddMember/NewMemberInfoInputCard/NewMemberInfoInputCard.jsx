import React from 'react'
import "./NewMemberInfoInputCard.css"
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useState } from 'react';
export default function NewMemberInfoInputCard() {
  const [email,setEmail] = useState(null);
  const [cellNumber,setCellNumber] = useState(null);

  const addMember = async () =>{





    const response = await fetch(import.meta.env.VITE_BACKEND_ORIGIN + "/addMember",{
  
  
  method:'POST',
  headers: {  "Content-Type": "application/json"},
  body: JSON.stringify({email,cellNumber}),
  credentials: "include"
  
  
  
    })
  
    const result = await response.json();
    console.log(result.message);
    window.location.reload();
  
   }
   


  return (
    <div className='member-info-card'>
        
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
