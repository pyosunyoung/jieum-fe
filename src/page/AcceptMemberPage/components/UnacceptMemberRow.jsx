import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UnacceptMemberRow = ({member, handleRefuse, handleAccept}) => {
  return (
    <div className="member-row">
      <div className="member-info-box">
        <div className="member-icon-box">
          <AccountCircleIcon className="member-profile-icon" />
        </div>

        <div>
          <div className="member-name">{member&&member.name}</div>
          <div className="member-temp-info">열정온도: {member&&member.passionTemp}°</div>
        </div>
      </div>

      <div className="member-appeal-phrase">{member&&member.fightingMessage}</div>

      <div className="member-button-section">
        <button onClick={handleRefuse} className="member-button member-refuse">거절</button>
        <button onClick={handleAccept} className="member-button member-accept">승인</button>
      </div>
    </div>
  );
};

export default UnacceptMemberRow;
