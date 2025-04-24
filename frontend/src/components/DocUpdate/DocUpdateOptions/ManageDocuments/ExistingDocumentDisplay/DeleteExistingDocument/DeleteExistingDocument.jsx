import React from 'react'
import "./DeleteExistingDocument.css"
export default function DeleteExistingDocument({id}) {




    const deleteDocumentFromDashBoard = async() =>{


        const response = await fetch( import.meta.env.VITE_BACKEND_ORIGIN + "/deleteDocumentFromDashBoard",{
      
      
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({id}),
        credentials:'include'
        });
    
    
        const data = await response.json();
    
    
    
    
        
      
      
      } 






  return (
    <div className='delete-doc'>
        

        
        <button onClick={()=>deleteDocumentFromDashBoard()}>❌</button>


    </div>
  )
}
