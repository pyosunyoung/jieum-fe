import React, { useEffect } from 'react'
import "react-step-progress-bar/styles.css";
import {ProgressBar} from "react-step-progress-bar"
import "../HomepageComponent.style.css"

const CharProgressBar = ({barPercent}) => {
  const totalTemperature = JSON.parse(localStorage.getItem('totaltemperature')) || 80;
  return (
    <div className='char-progress-bar'>
      <ProgressBar
        percent={totalTemperature}
        filledBackground="linear-gradient(to right, #AFB476 ,#4C4E33)"
        height={17}
      />
      <div className='progress-bar-percent'>{totalTemperature}%</div>
    </div>
  )
}

export default CharProgressBar
