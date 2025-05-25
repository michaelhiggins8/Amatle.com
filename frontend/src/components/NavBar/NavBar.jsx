import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect,useState } from 'react';
import "./NavBar.css";
import Admin from "./Admin/Admin.jsx";
import Member from './Member/Member.jsx';
import NotLoggedIn from './NotLoggedIn/NotLoggedIn.jsx';
import { useScrollNavbar } from './useScrollNavbar';

export default function NavBar() {




const [userStatus,setUserStatus] = useState(null);
const isScrolled = useScrollNavbar();





useEffect(()=>{

  const queryUserProfile = async() =>{
    const response = await fetch(import.meta.env.VITE_BACKEND_ORIGIN + "/queryUserProfile",{


      method:'GET',
      headers: {'Content-Type': 'application/json'},
    credentials:'include'
      });


      const data = await response.json();
      setUserStatus(data.message);
      console.log(data);

  }


  queryUserProfile();


},[])





  

  return (
    
    
    
    <div>
        

    <nav className={`nav-bar ${isScrolled ? 'scrolled' : ''}`}>
        
        

        {userStatus === 'admin' && <Admin />}
        {userStatus === 'member' && <Member />}
        {userStatus === null && <NotLoggedIn/>}
         



    </nav>


    </div>





  )
}
