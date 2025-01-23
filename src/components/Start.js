import React from 'react'
import { useRef } from 'react';
import './Start.css'

function Start ({setUsername}) {
    const inputref= useRef();
    const handleClick = () => {
        inputref.current.value && setUsername(inputref.current.value);
    }
  return (
    <div>
        <input className='startInput' placeholder='Enter your Name :' ref={inputref}></input>
        <button onClick={handleClick}>Start Quiz</button> 
    </div>
  )
}

export default Start;