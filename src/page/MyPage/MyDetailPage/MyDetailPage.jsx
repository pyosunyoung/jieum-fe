import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MyDetailPage.style.css';
import UserInfoBox from './userinfo-page/UserInfoBox';
import UserInfoEdit from './userinfo-page/UserInfoEdit';

const MyDetailPage = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const { userData, userInfoFields } = location.state;

  const [userInfo, setUserInfo] = useState(userData);
  const [viewMode, setViewMode] = useState('info'); //정보 확인 또는 수정
  const [editedUserInfo, setEditedUserInfo] = useState(userData);

  //내 정보 수정하기
  const handleEditClick = () => {
    setViewMode('edit');
  };

  //취소 버튼
  const handleCancelClick = () => {
    setViewMode('info');
    setEditedUserInfo(userInfo);
  };

  //저장 버튼
  const handleSaveClick = () => {
    setUserInfo(editedUserInfo);
    setViewMode('info');
    console.log('수정된 정보', editedUserInfo);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (currentPassword, newPassword) => {
    console.log('현재 비밀번호', currentPassword);
    console.log('새 비밀번호', newPassword);
  };

  return (
    <div className="my-detail-page">
      {viewMode === 'info' ? (
        <UserInfoBox
          userInfo={userInfo}
          fields={userInfoFields}
          onEdit={handleEditClick}
        />
      ) : (
        <UserInfoEdit
          userInfo={editedUserInfo}
          fields={userInfoFields}
          onChange={handleInputChange}
          onSave={handleSaveClick}
          onCancel={handleCancelClick}
          onPasswordChange={handlePasswordChange}
        />
      )}
    </div>
  );
};

export default MyDetailPage;
