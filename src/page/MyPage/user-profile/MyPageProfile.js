import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UserTempBar from './UserTempBar';
import './MyPageProfile.css';
import { useDispatch } from 'react-redux';
import { getTemperature } from '../../../features/user/userSlice';

const MyPageProfile = ({ userInfo, user }) => {
  //사용자 온도바
  const dispatch = useDispatch();
  const [userTemp, setUserTemp] = useState(80); //초기값 80으로 설정
  useEffect(() => {
    if (!user.temperature) {
      dispatch(getTemperature());
    }
  }, [dispatch, user.temperature]);
  
  console.log("user", user)
  return (
    <div className="myPage-profile-box">
      <div className="profile-section">
        <AccountCircleIcon className="user-profile-icon" />
        <UserTempBar user={user} />
      </div>
    
      <p className="user-profile-item">
        <strong>{user.name}</strong>
        {user.department} <br />
        {user.studentNumber}학번
      </p>

      <div className="interest-keywords-Subtitle">
        <p>-각오의 한마디 : {user.DeterminationWord}</p>
      </div>

      <div className="interest-keywords-Subtitle">
        <p>-관심 키워드</p>
      </div>
      <div className="interest-keywords">
        {user.InterestTag.map((keyword, index) => (
          <span key={index} className="keyword-item">
            #{keyword}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MyPageProfile;
