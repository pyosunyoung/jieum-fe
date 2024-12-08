import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './User.css';

import Dropdown from 'react-bootstrap/Dropdown';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/user/userSlice';

const User = ({user}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [userName, setUserName] = useState('정기찬'); // 렌더링 위해 초기값 설정 (사용자 이름)
  const [notificationCount, setNotificationCount] = useState(2); // 렌더링 위해 초기값 설정 (알림 개수)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const toggleDropdown = () => {
    //prev == 함수에 전달된 현재 상태 값!!
    //viewDropdown 상태가 true일 땐 false, false일 땐 true
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = ()=>{
    dispatch(logout());
    navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
  }

  return (
    <div className="user-tab">
      <div className="userprofile">
        <AccountCircleIcon className="user-profile-icon" />
        <span className="user-profile-name">{user.name || "없음"}</span>

        {/* 드롭다운 상태 변경 */}
        <div onClick={toggleDropdown} className="dropdown-icon-style">
          {isDropdownOpen ? (
            <KeyboardArrowUpIcon className="dropdown-icon" />
          ) : (
            <KeyboardArrowDownIcon className="dropdown-icon" />
          )}
        </div>

        {/* 드롭다운 메뉴 >> 사용자가 클릭시 보이고 다시 클릭시 안 보이게 */}
        {isDropdownOpen && (
          <Dropdown.Menu
            className="dropdown-menu"
            show={isDropdownOpen}
            style={{ position: 'absolute', top: '30px' }}
          >
            <Dropdown.Item onClick={()=>navigate("/account/purchase")}>마이페이지</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        )}

        {/* <div className="notification">
          <NotificationsNoneIcon />
          <span className="notifyBadge">{notificationCount}</span>
        </div> */}
      </div>
    </div>
  );
};

export default User;
