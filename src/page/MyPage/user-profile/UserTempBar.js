import React from 'react';
import './UserTempBar.css';

const UserTempBar = ({ userTemp, user }) => {
  const customerTemperature = localStorage.getItem("temperature");
  const adminTemperature = localStorage.getItem("admintemperature");
  const jungTemperature = localStorage.getItem("jungTemperature");
  const parkTemperature = localStorage.getItem("parkTemperature");
  const kimTemperature = localStorage.getItem("kimTemperature");
  const koTemperature = localStorage.getItem("koTemperature");

  let displayedTemperature;

  if (user.name === "표선영") {
    displayedTemperature = adminTemperature; // 표선영은 adminTemperature
  } else if (user.name === "정기찬") {
    displayedTemperature = jungTemperature; // 정기찬은 jungTemperature
  } else if (user.name === "박정효") {
    displayedTemperature = parkTemperature; // 박정효는 parkTemperature
  } else if (user.name === "김주은") {
    displayedTemperature = kimTemperature; // 김주은은 kimTemperature
  } else if (user.name === "고하늘") {
    displayedTemperature = koTemperature; // 고하늘은 koTemperature
  } else {
    // default로 고객 온도를 사용
    displayedTemperature = user.level === "admin" ? adminTemperature : customerTemperature;
  }

  console.log("Displayed Temperature:", displayedTemperature);

  return (
    <div className="user-temp-container">
      <div className="temp-title">열정온도 *</div>

      <div className="user-temp-bar-container">
        <div className="user-temp-bar">
          <div 
            className="temp-fill" 
            style={{ width: `${displayedTemperature}%` }} 
          />
        </div>
        <span className="temp-label">{displayedTemperature}°C</span>
      </div>
    </div>
  );
};

export default UserTempBar;
