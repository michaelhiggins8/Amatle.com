import React from 'react'
import "./DashboardMainSection.css"
import { useState } from 'react'
import UserRows from './UserRows/UserRows';
import AddMember from './UserRows/AddMember/AddMember';
import { useEffect } from 'react';
export default function DashboardMainSection() {

    const [users,setUsers] = useState(null);
    const fetchUsers = async () =>{





        const response = await fetch(import.meta.env.VITE_BACKEND_ORIGIN + "/fetchUsers",{
      
      
      method:'GET',
      headers: {  "Content-Type": "application/json"},
      credentials: "include"
      
      
      
        })
      
        const result = await response.json();
        console.log(result.message);
        setUsers(result.message);
      
      
       }
       



useEffect(()=>{

  fetchUsers();

},[]);





  return (
    <div>

      <div className='dash-main-section-first-row'>
        <div>
          <h3>Edit members</h3>
          <h1>Members</h1>
        </div>
        
        <AddMember/>

      </div>
        

{users && users.map(user => <UserRows email = {user.email} role = {user.role} id = {user.id}/>)}






    </div>
  )
}
