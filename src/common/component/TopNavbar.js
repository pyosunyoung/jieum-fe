import React from "react";
import { Outlet } from 'react-router';
import "../style/common.style.css"; // 스타일을 적용할 CSS 파일을 추가로 생성합니다.

const TopNavbar = () => {
  return (
    <div className="top-navbar">
        <div className="site-title-section">백석 지음(知音)</div>
        {/* <div className="user-section">
          <img src={profileImg} className="profile-image" />
          <div>{userName} 님</div>
        </div> */}
        <Outlet /> {/*네브바 고정 위해 필요*/}
      </div>

      
  );
};

export default TopNavbar;