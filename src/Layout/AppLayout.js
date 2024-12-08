import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Outlet } from 'react-router';
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../common/component/Sidebar";
import Navbar from "../common/component/Navbar";
import ToastMessage from "../common/component/ToastMessage";
import { loginWithToken } from "../features/user/userSlice";
import { getCartQty } from "../features/cart/cartSlice";
import SideBar2 from '../common/component/Sidebar2';
import TopNavbar from '../common/component/TopNavbar';
import "./AppLayout.css";
const AppLayout = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate=useNavigate();
  
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);
  useEffect(() => {
    if (user) {
      dispatch(getCartQty());
    }
  }, [user]);
  return (
    <div>
      
      <ToastMessage />
      {location.pathname.includes("admin") ? (
        <Row className="vh-100">
          
          <Col xs={12} md={3} className="sidebar mobile-sidebar">
          
            <Sidebar />
            <div className="top-navbar">
        <div onClick={()=>navigate("/")} className="site-title-section">백석 지음(知音)</div>
        {/* <div className="user-section">
          <img src={profileImg} className="profile-image" />
          <div>{userName} 님</div>
        </div> */}
      </div>
          </Col>
          <Col xs={12} md={9}>
            {children}
          </Col>
          
        </Row>
      ) : (
        <>
          
            
          <div className="sidebar-container">
          <Navbar user={user} />
          </div>
          
          {/* <TopNavbar/> */}
          <div className="top-navbar">
        <div onClick={()=>navigate("/")} className="site-title-section">백석 지음(知音)</div>
        {/* <div className="user-section">
          <img src={profileImg} className="profile-image" />
          <div>{userName} 님</div>
        </div> */}
      </div>
      
      <Outlet /> {/*네브바 고정 위해 필요*/}
          {children}
        
        </>
      )}
    </div>
  );
};

export default AppLayout;
