import React, {useState} from "react";
import "./SubNav.css";

const SubNav = ({selectedTab, setSelectedTab}) => {
  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <div className="sub-nav">
      <ul className="subNav-list">
        <li
          onClick={() => handleTabClick("전체")}
          className={selectedTab === "전체" ? "active" : ""}
        >
          전체
        </li>
        <li
          onClick={() => handleTabClick("전공")}
          className={selectedTab === "전공" ? "active" : ""}
        >
          전공
        </li>
        <li
          onClick={() => handleTabClick("교양")}
          className={selectedTab === "교양" ? "active" : ""}
        >
          교양
        </li>
        <li
          onClick={() => handleTabClick("자기개발")}
          className={selectedTab === "자기개발" ? "active" : ""}
        >
          자기개발
        </li>
      </ul>
    </div>
  );
};

export default SubNav;
