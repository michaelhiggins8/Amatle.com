import React from 'react'
import "./QuerryShowCard.css"
import video from "../../../videos/QuerryDemo.mp4"
export default function QuerryShowCard() {
  return (
    <div className='querry-show-card'>
        <h1>Never be confused again...</h1>

        <video src = {video} autoPlay 
  loop 
  muted 
  playsInline ></video>
    </div>
  )
}
