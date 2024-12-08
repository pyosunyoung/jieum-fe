import React from 'react';
import '../style/SideBar2.css';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import SettingsIcon from '@mui/icons-material/Settings';

const SideBar2 = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <li className="sidebarListItem">
              
            </li>
            <li className="sidebarListItem">
              <HomeIcon className="sidebarIcon" />홈
            </li>
            <li className="sidebarListItem">
              <FavoriteBorderIcon className="sidebarIcon" />
              관심 목록
            </li>
            <li className="sidebarListItem">
              <BrowserUpdatedIcon className="sidebarIcon" />
              신청 목록
            </li>
            <li className="sidebarListItem">
              <SettingsIcon className="sidebarIcon" />
              마이페이지
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar2;