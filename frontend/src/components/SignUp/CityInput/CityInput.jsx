import React from 'react'
import "./CityInput.css";
import { useState } from 'react';
export default function CityInput({setSignUpData,signUpData}) {
  
  
    const [cityName, setCityName] = useState('');
    const [predictionsHolder,setPredictionsHolder] = useState();
    const queryCitySuggestions = async() =>{

        const respoz = await fetch(
            import.meta.env.VITE_BACKEND_ORIGIN + `/queryCitySuggestions?cityName=${cityName}`,
            {
                method:'GET'
                
            
            }


        );

        const result = await respoz.json();
        console.log(result.predictions);
        setPredictionsHolder(result.predictions);

    }


    const [inputValue, setInputValue] = useState('');


const handleCitSelection = (place_id,description) =>{

    let holder = { ...signUpData }
    holder["city_name"] = description;
    holder["city_id"] = place_id;
    setSignUpData(holder);
    setInputValue(description);
    setPredictionsHolder(null);


    

}

    return (

   
    <div className='city_input_card'>
            
    
        <input placeholder='city' onChange={(e)=>{setCityName(e.target.value); setInputValue(e.target.value)}} value = {inputValue}></input>
        <button onClick={()=>queryCitySuggestions()}>Search</button>
        <div className='a'>
            {predictionsHolder &&         
                (
                    <ul className='predictions'>
                        {predictionsHolder.map(
                            (city,index)=>(
                                <>
                                    <li key = {city.place_id} onClick={()=>handleCitSelection(city.place_id,city.description)}>{city.description}</li>
                                </>
                            )
                        )}
                    </ul>
                )   
            }
        </div>

        
    </div>

    

    
  )
}
