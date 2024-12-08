import React from "react";

const RecruitRadioButton = ({ limitlessRecruitBoolean, handleRecruitRadio }) => {
  return (
    <label className="recruit-radio-section recruit-radio-font">
      <input
        type="checkbox"
        checked={limitlessRecruitBoolean}
        onChange={handleRecruitRadio} // 클릭 시 부모로 이벤트 전달
        className="recruit-radio"
      />
      제한 없음
    </label>
  );
};

export default RecruitRadioButton;