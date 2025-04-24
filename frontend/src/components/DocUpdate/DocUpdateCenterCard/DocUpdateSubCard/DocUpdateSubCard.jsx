import React from 'react'
import "./DocUpdateSubCard.css"
import { Link } from 'react-router-dom'

export default function DocUpdateSubCard({hedr,linnkUrl,linnkTxt,imigUrl,pic}) {
  return (
    <div className='doc-update-sub-card'>
        

        <div className='first-hedr-doc'>
            <h1 >{hedr}</h1>
        </div>
        <Link to = {linnkUrl}>{linnkTxt}</Link>
        <h1 className='second-hedr-doc'>{pic}</h1>



    </div>
  )
}
