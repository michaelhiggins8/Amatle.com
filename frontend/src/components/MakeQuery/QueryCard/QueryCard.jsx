import React from 'react'
import "./QueryCard.css"
import { useState } from 'react'
import { useEffect } from 'react';
export default function QueryCard() {


const [query,setQuery] = useState(null);
const [completion,setCompletion] = useState(" ");
const [queryHistory,setQueryHistory] = useState([])
const [chatBegan,setChatBegan] = useState(false);









const makeQuery = async (suggestionNum) =>{


 let whatWeWillSend = query
if (suggestionNum == 1){

whatWeWillSend = "Are short term rentals allowed?";
}else if (suggestionNum == 2){

  whatWeWillSend ="How many pets can I have?";
}else if (suggestionNum == 3){

  whatWeWillSend = "Can I park in the street?";
}else if (suggestionNum == 4){
  whatWeWillSend="Can I paint my house purple?";
  
}


  let sentQuery = whatWeWillSend;
console.log(whatWeWillSend)
  
const response = await fetch(import.meta.env.VITE_BACKEND_ORIGIN + "/makeQuery",{


    method:'POST',
    headers: {  "Content-Type": "application/json"},
    body: JSON.stringify({"query":whatWeWillSend}),
     credentials: "include"
    
    
    
      });


const data = await response.json();
setChatBegan(true);
setQueryHistory([...queryHistory,{role: 'user',content:sentQuery},{role: 'assistant',content:data.message}]);

setCompletion(data.message);







}




useEffect(()=>{

  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });


},[queryHistory]);




const handleSuggestion =  (suggestionNum) => {







  
  makeQuery(suggestionNum);



   


};






  return (
<div>

  <div className='maincolumn'>
      <div className='chat-content-ui'>

          {queryHistory.map(item => <><div className= {item.role == 'user' ? "user-style" : "assistant-style" }> <p >  {item.content} </p></div><br/></>)}

          <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
      </div>

    
      <div className= {chatBegan ? 'inputs-continer-chat-started' : 'inputs-continer-chat-not-started'}>
              
          
             {!chatBegan && <h1>Understand your community</h1>} 
              
                <textarea
                    onChange={(e)=>setQuery(e.target.value)}
                    placeholder="Type something..."
                    rows={1} 
                    className='textArea'
                    
                  />
                  <div className='make-query-button-wrapper'>
                      <button onClick={()=>makeQuery(null)}>⬆️</button>
                  </div>

                {!chatBegan && 
                <div className='suggestions'>
                    <div className='suggestion-box' onClick={() =>handleSuggestion(1)}> Are short term rentals allowed?</div>
                    <div className='suggestion-box' onClick={() =>handleSuggestion(2)}> How many pets can I have?</div>
                    <div className='suggestion-box'onClick={() =>handleSuggestion(3)}> Can I park in the street?</div>
                    <div className='suggestion-box'onClick={() =>handleSuggestion(4)}> Can I paint my house purple?</div>
                </div>
                  }
      </div>





  </div>
        
     

</div>
  )
}
