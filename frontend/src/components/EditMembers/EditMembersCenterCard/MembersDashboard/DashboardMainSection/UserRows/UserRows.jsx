import React from 'react'
import "./UserRows.css"
export default function UserRows({email,role,id}) {


    const deleteMember = async () =>{





        const response = await fetch(import.meta.env.VITE_BACKEND_ORIGIN + "/deleteMember",{
      
      
      method:'POST',
      headers: {  "Content-Type": "application/json"},
      body: JSON.stringify({id}),
      credentials: "include"
      
      
      
        })
      
        const result = await response.json();
        console.log(result);
        window.location.reload();

      
      
       }
       


  return (

   
        
    <div className='user-row'>
     
    <h1>{email}</h1>
    <h1>{role}</h1>
    {role == 'member' && <button onClick={()=>deleteMember()}>🗑️</button>}

    

    </div>
    
  )
}
