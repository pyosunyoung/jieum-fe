import React, { useState } from 'react';
import { Container, Form, Button, Alert, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import './style/register.style.css';

import { registerUser } from '../../features/user/userSlice';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    PhoneNumber: '',
    DeterminationWord: '',
    department: '',
    studentNumber: '',
    InterestTag: [],
    policy: false,
  });
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState('');
  const [policyError, setPolicyError] = useState(false);
  const { registrationError } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false); // 모달 상태
  const [selectedTags, setSelectedTags] = useState([]);
  const register = (event) => {
    event.preventDefault();
    const {
      name,
      email,
      password,
      confirmPassword,
      PhoneNumber,
      DeterminationWord,
      department,
      studentNumber,
      InterestTag,
      policy,
    } = formData;
    const checkConfirmPassword = password === confirmPassword;
    if (!checkConfirmPassword) {
      setPasswordError('비밀번호 중복확인이 일치하지 않습니다.');
      return;
    }
    if (!policy) {
      setPolicyError(true);
      return;
    }
    setPasswordError('');
    setPolicyError(false);
    dispatch(
      registerUser({
        name,
        email,
        password,
        PhoneNumber,
        DeterminationWord,
        department,
        studentNumber,
        InterestTag,
        navigate,
      })
    );
  };

  // const handleChange = (event) => {
  //   event.preventDefault();
  //   let { id, value, type, checked } = event.target;
  //   if (id === 'confirmPassword' && passwordError) setPasswordError('');
  //   if (type === 'checkbox') {
  //     if (policyError) setPolicyError(false);
  //     setFormData((prevState) => ({ ...prevState, [id]: checked }));
  //   } else {
  //     setFormData({ ...formData, [id]: value });
  //   }
  // };
  const handleChange = (event) => {
    event.preventDefault();
    let { id, value, type, checked } = event.target;

    // Reset password error when confirmPassword changes
    if (id === 'confirmPassword' && passwordError) setPasswordError('');

    if (id === 'InterestTag') {
        // InterestTag is an array, handle toggle behavior for tags
        setFormData((prevState) => {
            const updatedTags = prevState.InterestTag.includes(value)
                ? prevState.InterestTag.filter((tag) => tag !== value) // Remove tag if already selected
                : [...prevState.InterestTag, value]; // Add tag if not selected
            return { ...prevState, InterestTag: updatedTags };
        });
    } else if (type === 'checkbox') {
        // Handle checkbox fields
        if (policyError) setPolicyError(false);
        setFormData((prevState) => ({ ...prevState, [id]: checked }));
    } else {
        // Handle text, email, and other input types
        setFormData((prevState) => ({ ...prevState, [id]: value }));
    }
};

const toggleModal = (state) => {
  setShowModal(state);
};
const handleTagChange = (tag) => {
  setSelectedTags((prevTags) =>
    prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
  );
  setFormData((prevState) => ({
    ...prevState,
    InterestTag: selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag],
  }));
};


  return (
    
    <Container className="register-area">
      <h2 className="signup-form-title">백석지음[知音] 회원가입</h2>
      <div className="register-container">
      {registrationError && (
        <div>
          <Alert variant="danger" className="error-message">
            {registrationError}
          </Alert>
        </div>
      )}
      <Form onSubmit={register}>
        <Form.Group className="mb-3">
          <Form.Label>아이디</Form.Label>
          <Form.Control
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요."
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>이름</Form.Label>
          <Form.Control
            type="text"
            id="name"
            placeholder="이름을 입력해주세요."
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>전화번호</Form.Label>
          <Form.Control
            type="Number"
            id="PhoneNumber"
            placeholder="전화번호를 입력해주세요."
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            id="confirmPassword"
            placeholder="비밀번호를 다시 입력해주세요."
            onChange={handleChange}
            required
            isInvalid={passwordError}
          />
          <Form.Control.Feedback type="invalid">
            {passwordError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>각오의 한마디</Form.Label>
          <Form.Control
            type="text"
            id="DeterminationWord"
            placeholder="각오의 한마디"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>학부</Form.Label>
          <Form.Select id="department" onChange={handleChange} required>
            <option value="">학부를 선택해주세요</option>
            <option value="간호학과">간호학과</option>
<option value="경상학부">경상학부</option>
<option value="경찰학부">경찰학부</option>
<option value="관광학부">관광학부</option>
<option value="기독교학부">기독교학부</option>
<option value="디자인영상학부">디자인영상학부</option>
<option value="문화예술학부">문화예술학부</option>
<option value="보건학부">보건학부</option>
<option value="사범학부">사범학부</option>
<option value="사회복지학부">사회복지학부</option>
<option value="스포츠과학부">스포츠과학부</option>
<option value="어문학부">어문학부</option>
<option value="외식산업학부">외식산업학부</option>
<option value="첨단IT학부">첨단IT학부</option>
<option value="컴퓨터공학부">컴퓨터공학부</option>
<option value="혁신융합학부">혁신융합학부</option>
            {/* 추가 학부 옵션을 여기에 추가 */}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>학번</Form.Label>
          <Form.Control
            type="text"
            id="studentNumber"
            placeholder="학번"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="이용약관에 동의합니다"
            id="policy"
            onChange={handleChange}
            isInvalid={policyError}
            checked={formData.policy}
          />
        </Form.Group>
        <Button variant="warning" onClick={() => toggleModal(true)}>
          관심 태그 선택
        </Button>
        <Button variant="danger" type="submit" className="registerbutton-right">
          회원가입
        </Button>
        
      </Form>
       {/* 모달 */}
       <Modal show={showModal} onHide={() => toggleModal(false)} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>관심있는 태그 선택</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>전공</h4>
          {[
            "#간호학과",
            "#경상학부",
            "#경찰학부",
            "#관광학부",
            "#기독교학부",
            "#디자인영상학부",
            "#문화예술학부",
            "#보건학부",
            "#사범학부",
            "#사회복지학부",
            "#스포츠과학부",
            "#어문학부",
            "#외식산업학부",
            "#첨단IT학부",
            "#컴퓨터공학부",
            "#혁신융합학부",
          ].map((tag) => (
            <button
              key={tag}
              className={`interest-checkbox-button ${
                selectedTags.includes(tag) ? "checked" : ""
              }`}
              onClick={() => handleTagChange(tag)}
              
            >
              {tag}
            </button>
          ))}
          <hr/>
          <h4>교양</h4>
          {[
            "#글로벌 역량",
            "#균형",
            "#논리/비판적 사고",
            "#대인관계",
            "#리더십",
            "#맞춤형 글쓰기",
            "#발표와 토론",
            "#사랑의 실천",
            "#사회봉사",
            "#수학/기초과학",
            "#외국어",
            "#정보기술",
            "#창의 융합 교양",
            "#협업 및 기타소양",
          ].map((tag) => (
            <button
              key={tag}
              className={`interest-checkbox-button ${
                selectedTags.includes(tag) ? "checked" : ""
              }`}
              onClick={() => handleTagChange(tag)}
              
            >
              {tag}
            </button>
          ))}
          <hr/>
          <h4>자기개발</h4>
          {["#어학", "#취업", "#취미", "#개발", "#기타"].map((tag) => (
            <button
              key={tag}
              className={`interest-checkbox-button ${
                selectedTags.includes(tag) ? "checked" : ""
              }`}
              onClick={() => handleTagChange(tag)}
              
            >
              {tag}
            </button>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => toggleModal(false)}>
            이전
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              toggleModal(false);
            }}
          >
            완료
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </Container>
    
  );
};

export default RegisterPage;
