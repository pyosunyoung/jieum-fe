import React, { useEffect, useState } from 'react';
import BeauryGrow from './BeauryGrow';
import CharInfoBox from './CharInfoBox';
import CharProgressBar from './CharProgressBar';
import "../HomepageComponent.style.css";
import { useDispatch, useSelector } from 'react-redux';

const CharacterSection = () => {
  const dispatch = useDispatch();
  const initialTemperature = JSON.parse(localStorage.getItem('totaltemperature')) || 80;
  const currentUserData = useSelector((state) => state.currentUserData);

  const [charLevel, setCharLevel] = useState(1);
  const [totalTemperature, setTotalTemperature] = useState(initialTemperature);
  const [showLevelUpText, setShowLevelUpText] = useState(false);

  useEffect(() => {
    let updatedTemperature = totalTemperature;
    let newLevel = charLevel;

    // Handle multiple level-ups if totalTemperature exceeds multiple thresholds
    while (updatedTemperature >= 100) {
      newLevel += 1;
      updatedTemperature -= 100;
      setShowLevelUpText(true);
    }

    if (newLevel !== charLevel) {
      setTimeout(() => setShowLevelUpText(false), 1200); // Show level-up text briefly
      setCharLevel(newLevel);
      setTotalTemperature(updatedTemperature);
    }
  }, [totalTemperature, charLevel]);

  const handleIncreaseTemperature = (amount) => {
    const updatedTemperature = totalTemperature + amount;
    localStorage.setItem('totaltemperature', updatedTemperature);
    setTotalTemperature(updatedTemperature);
  };

  return (
    <div className='top-left-box'>
      <div className='character-image-box'>
        <CharInfoBox level={charLevel} />
        <BeauryGrow level={charLevel} showLevelUpText={showLevelUpText} />
        <CharProgressBar totalTemperature={totalTemperature} />
      </div>
      <button onClick={() => handleIncreaseTemperature(10)}>Weekly Schedule Finish</button>
      <button onClick={() => handleIncreaseTemperature(30)}>Entire Study Finish</button>
    </div>
  );
};

export default CharacterSection;
