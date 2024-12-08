import React from 'react'
import beauryEgg from "../../../../common/images/characters/character1.png"
import beauryHatched from "../../../../common/images/characters/character2.png"
import beauryBaby from "../../../../common/images/characters/character3.png"

const BeauryGrow = ({level,showLevelUpText}) => {
  return (
    <>

    {showLevelUpText?<div className='level-up-text text-fade-out'>Level Up!!</div>:""}
    {level===1?<img src={beauryEgg} className='char-image char1 egg-rotate'/>:""}
    {level===2?<img src={beauryHatched} className='char-image char2 small-bounce'/>:""}
    {level>=3?<img src={beauryBaby} className='char-image char3 big-bounce'/>:""}
    
    </>
    
    
  )
}

export default BeauryGrow
