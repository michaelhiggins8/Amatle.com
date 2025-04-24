import React from 'react'
import "./CreatePassword.css"
import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
export default function CreatePassword() {

    const quryParams = new URLSearchParams(useLocation().search);
    const user = quryParams.get("user");


    useEffect(()=>{



        const signInUserInitialCreation = async() =>{


            const result = await fetch(import.meta.env.VITE_BACKEND_ORIGIN + "/signInUserInitialCreation ",
                {method:"POST",
                credentials:"include",
                headers:{
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({"user":user})
            
            })
    
    
    
    
    
        }


        signInUserInitialCreation();





    },[user]);





    
    const [password,setPassword] = useState(null);

    const selectPassword = async() =>{


        const result = await fetch(import.meta.env.VITE_BACKEND_ORIGIN + "/selectPassword",
            {method:"POST",
            credentials:"include",
            headers:{
                "Content-Type": "application/json"
              },
              body: JSON.stringify({"password":password})
        
        })





    }
  return (
    <div>
        

    <input onChange={(event)=>setPassword(event.target.value)}></input>
    <button onClick = {()=>selectPassword()}>Set password</button>
    {password }
    {user && <p>{user}</p>}




    </div>
  )
}
