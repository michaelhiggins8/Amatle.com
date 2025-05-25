import React from 'react'
import "./QuerryShowCard.css"
import video from "../../../videos/QuerryDemo.mp4"

export default function QuerryShowCard() {
  return (
    <section className='querry-show-section'>
      <div className='container'>
        <div className='querry-content'>
          <div className='querry-text'>
            <span className='eyebrow'>AI-Powered Management</span>
            <h2>Never be confused again...</h2>
            <p>Experience your new intuitive HOA help desk. A platform with AI-driven 
               real-time assistance. Streamline your community education with 
               intelligent automation.</p>
          </div>
          
          <div className='video-container'>
            <div className='video-wrapper'>
              <video 
                src={video} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className='demo-video'
              />
            </div>
            <div className='video-caption'>
              Watch how our AI simplifies member communication
            </div>
          </div>
        </div>
        
        <div className='feature-highlights'>
          <div className='feature'>
            <div className='feature-icon'>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
              </svg>
            </div>
            <h3>Easy Dashboard</h3>
            <p>Manage everything from one intuitive interface</p>
          </div>
          <div className='feature'>
            <div className='feature-icon'>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
            </div>
            <h3>24/7 Support</h3>
            <p>AI-powered assistance whenever you need it</p>
          </div>
        </div>
      </div>
    </section>
  )
}
