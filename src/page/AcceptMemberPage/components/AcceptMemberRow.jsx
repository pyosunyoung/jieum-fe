import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const AcceptMemberRow = ({member}) => {
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
    </div>
  );
};

export default AcceptMemberRow;
