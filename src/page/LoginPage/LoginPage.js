import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./style/login.style.css";
import { loginWithEmail, clearErrors } from "../../features/user/userSlice";
import pic1 from './img/emoji.png'
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loginError } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (loginError) {
      dispatch(clearErrors());
    }
  }, [loginError, dispatch]);

  const handleLoginWithEmail = (event) => {
    event.preventDefault();
    dispatch(loginWithEmail({ email, password }));
  };

  const handleGoogleLogin = async (googleData) => {
    // Google login logic
  };

  if (user) {
    navigate("/");
  }

  return (
    <div className="display-center">
      <div className="login-container">
        <div className="emoji-area">
          <img
            src={pic1} // 이미지 경로를 적절히 수정하세요
            alt="jieum-emoji"
            className="jieum-emoji"
          />
          <div className="emoji-text-area">
            <h6 className="emoji-text1">스터디의 시작,</h6>
            <h4 className="emoji-text2">백석지음[知音]</h4>
          </div>
        </div>
        <div className="login-area">
          <form className="login-box" onSubmit={handleLoginWithEmail}>
            <h2 className="login-box-header">백석 지음[知音]</h2>
            {loginError && (
              <div className="error-message">
                <Alert variant="danger">{loginError}</Alert>
              </div>
            )}
            <div className="mb-31">
              <input
                type="email"
                className="form-control"
                placeholder="아이디"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-31">
              <input
                type="password"
                className="form-control"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="button-box">
              <button type="submit" className="login-button">
                로그인
              </button>
              <div className="register-link">
                아직 계정이 없으세요?{" "}
                <Link to="/register" className="goToRegister">
                  회원가입
                </Link>
              </div>
            </div>
            <div className="text-align-center mt-2">
              
              <div >
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </GoogleOAuthProvider>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
