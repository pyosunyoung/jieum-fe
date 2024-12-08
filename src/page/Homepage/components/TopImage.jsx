import React from "react";
import "./HomepageComponent.style.css";
import { useNavigate } from "react-router-dom";

const TopImage = () => {
  const navigate=useNavigate();
  return(
    <div className="top-background-image">
      <button onClick={()=>navigate("/login")} className="top-image-button">스터디 시작</button>
    </div>
  ) 
  
};

export default TopImage;
