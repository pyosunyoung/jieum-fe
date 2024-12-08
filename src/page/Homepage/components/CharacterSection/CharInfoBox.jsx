import React from "react";

const CharInfoBox = ({level}) => {
  return (
    <div
      className={`char-info-box 
        ${level === 1 ? "level1" : ""} 
        ${level === 2 ? "level2" : ""} 
        ${level >= 3 ? "level3" : ""}`}
    >
      <div className="level-desc">레벨 {level}</div>
      <div className="help-info">
        {level === 1 ? "알에서 깨어나도록 도와주세요!" : ""}
        {level === 2 ? "뷰리가 알에서 나오려고 해요!" : ""}
        {level >= 3
          ? "뷰리가 잘 성장할 수 있도록 스터디에 열심히 참여해봐요!"
          : ""}
      </div>
    </div>
  );
};

export default CharInfoBox;
