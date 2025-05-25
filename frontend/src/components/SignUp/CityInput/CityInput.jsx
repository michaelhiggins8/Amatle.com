import React from 'react'
import "./CityInput.css";
import { useState } from 'react';
export default function CityInput({setSignUpData,signUpData}) {
  
    const [cityName, setCityName] = useState('');

    const handleCitySubmit = () => {
        if (cityName.trim()) {
            let holder = { ...signUpData }
            holder["city_name"] = cityName;
            holder["city_id"] = Date.now(); // Use timestamp as a unique ID
            setSignUpData(holder);
        }
    }

    return (
        <div className='city_input_card'>
            <input 
                placeholder='city' 
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
            />
            <button onClick={handleCitySubmit}>Set City</button>
        </div>
    )
} 