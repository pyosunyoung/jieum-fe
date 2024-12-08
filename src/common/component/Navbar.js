import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faBox, faSearch, faShoppingBag, faBell } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user/userSlice";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import SettingsIcon from "@mui/icons-material/Settings";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import "../style/SideBar2.css";
import User from './User';

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const { cartItemCount } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const isMobile = window.navigator.userAgent.indexOf("Mobile") !== -1;
  const [showSearchBox, setShowSearchBox] = useState(false);

  const menuList = ["여성", "Divided", "남성", "신생아/유아", "아동", "H&M HOME", "Sale", "지속가능성"];

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      if (event.target.value === "") return navigate("/");
      navigate(`?name=${event.target.value}`);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="nav-logo">
          <Link to="/">
            {/* <img src="/image/hm-logo.png" alt="hm-logo.png" /> */}
          </Link>
        </div>
        <div className="sidebarMenu">
          <ul className="sidebarList">
            {user && user.level === "admin" && (
              <li className="sidebarListItem">
                <Link to="/admin/product?page=1" className="navbar-link-borderNone">
                  <SupervisorAccountIcon className='adminAndSidebarIcon'/>스터디 관리
                </Link>
              </li>
            )}
             {user ? (
        <li className="sidebarListItem top-nav-underline top-nav">
          {/* User 컴포넌트를 렌더링하며 user를 props로 전달 */}
          <User user={user} />
        </li> 
      ) : (
        <li
          onClick={() => navigate("/login")}
          className="sidebarListItem top-nav-underline top-nav sub-text"
        >
          로그인 후 이용해주세요.
        </li>
      )}
            <hr />
            <Link className="sidebarListItem" to="/">
              {/* <img src="/image/hm-logo.png" alt="hm-logo.png" /> */}
              <HomeIcon className="sidebarIcon" />홈
            </Link>
            <li onClick={()=>navigate("/studies")} className="sidebarListItem list-nav">
            <CreateOutlinedIcon className="sidebarIcon" />
            스터디 신청
          </li>
            <li className="sidebarListItem" onClick={() => navigate("/cart")}>
              <FontAwesomeIcon icon={faBell} className="sidebarIcon" />
              {`알림 (${cartItemCount || 0})`}
            </li>
            <li className="sidebarListItem" onClick={() => navigate("/like")}>
              <FavoriteBorderIcon className="sidebarIcon" />
              관심 목록
            </li>
            <li className="sidebarListItem" onClick={() => navigate("/account/purchase")}>
              <FontAwesomeIcon icon={faBox} className="sidebarIcon" />
              마이페이지
            </li>
          </ul>
        </div>
        {!isMobile && (
          <div className="search-box landing-search-box">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder="게시글 검색"
              onKeyPress={onCheckEnter}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
