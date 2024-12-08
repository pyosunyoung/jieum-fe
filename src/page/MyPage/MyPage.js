import React, { useState, useEffect } from 'react';
import MyPageProfile from './user-profile/MyPageProfile';
import './MyPage.css';
import StudySection from './my-study-list/StudySection';
import MyStudyRecruitSection from './my-study-list/MyStudyRecruitSection';
import UserInfoBox from './MyDetailPage/userinfo-page/UserInfoBox';
import { useNavigate } from 'react-router-dom';

const MyPage = ({user, selectedOrder}) => {
  const [viewMode, setViewMode] = useState(null); //정보 확인 또는 수정
  const navigate = useNavigate();

  //사용자 정보 수정 위함 (초기값 별도 저장)
  // const [originalUserInfo, setOriginalUserInfo] = useState(createdUserData);
  //사용자 정보 저장 (로그인한 사용자)
  const [createdUserData, setCreatedUserData] = useState({
    userName: '',
    userDepartment: '',
    userPhoneNum: '',
    userID: '',
    userPassword: '',
    studentNum: '',
    userAppealPhrase: '',
    interestBadgeArray: [],
  });

  //스터디 데이터 (우선 초기값 설정해 뒀습니다)
  const [studyData, setStudyData] = useState([
    {
      id: 1,
      studyInfo: {
        category: '전공',
        subCategory: 'React 심화',
        subject: '리액트 프로젝트',
        recruitSize: 5,
        limitlessRecruit: false,
        createdBy: 'kohaneul1219', //임의로 추가한 데이터 (게시글 작성자 ID)
        currentRecruit: 5, //임의로 추가한 데이터 (지원한 인원)
      },
      createdAt: '2024.11.01',
      status: '진행 중',
    },
    {
      id: 2,
      studyInfo: {
        category: '교양',
        subCategory: '알고리즘',
        subject: '자료구조 및 알고리즘',
        recruitSize: 10,
        limitlessRecruit: true, //참여 인원 제한 없음 true
        createdBy: 'otherUser1212', //임의로 추가한 데이터 (게시글 작성자 ID)
        currentRecruit: 10, //임의로 추가한 데이터 (지원한 인원)
      },
      createdAt: '2024.09.15',
      status: '진행 완료',
    },
    {
      id: 3,
      studyInfo: {
        category: '전공',
        subCategory: '데이터베이스',
        subject: '데이터베이스 원리 및 응용',
        recruitSize: 3,
        limitlessRecruit: false,
        createdBy: 'kohaneul1219', //임의로 추가한 데이터!!
        currentRecruit: 1, //임의로 추가한 데이터!!
      },
      createdAt: '2024.11.30',
      status: '모집 중', //모집 상태
    },
    {
      id: 4,
      studyInfo: {
        category: '자기개발',
        subCategory: '독해 및 리스닝',
        subject: '토익',
        recruitSize: 8,
        limitlessRecruit: false,
        createdBy: 'kohaneul1219',
        currentRecruit: 7,
      },
      createdAt: '2024.12.01',
      status: '모집 중',
    },
  ]);

  console.log('userData', createdUserData);

  const [editedUserInfo, setEditedUserInfo] = useState(createdUserData);

  useEffect(() => {
    const fetchUserData = async () => {
      //우선 예시로 제 정보 설정했습니다
      const userInfo = {
        userName: '표선영',
        userDepartment: '컴퓨터공학부',
        studentNum: 20,
        userPhoneNum: '010-9806-3719',
        userID: 'pyo@gmail.com',
        userPassword: 'fuckinghaneul$$11',
        userAppealPhrase: '리액트 빠이또',
        interestBadgeArray: ['리액트', '자바스크립트', '컴퓨터공학부'],
      };
      setCreatedUserData(userInfo);
      // setOriginalUserInfo(userInfo);
    };
    fetchUserData();
  }, []);

  const userInfoFields = [
    { name: 'userName', label: '이름' },
    { name: 'userDepartment', label: '학과' },
    { name: 'studentNum', label: '학번' },
    { name: 'userPhoneNum', label: '전화번호' },
    { name: 'userID', label: '아이디' },
    { name: 'userPassword', label: '비밀번호' },
    { name: 'userAppealPhrase', label: '각오의 한 마디' },
    { name: 'interestBadgeArray', label: '관심 태그' },
  ];

  //모집 완료 버튼을 클릭했을 경우 호출되는 것
  const handleCompleteRecruit = (id) => {
    setStudyData((prev) =>
      prev.map((study) =>
        study.id === id ? { ...study, status: '진행 중' } : study
      )
    );
  };

  //내 정보 보기
  const handleViewInfoClick = () => {
    console.log('navigation to details page');
    navigate('/myinfo/details', {
      state: {
        userData: createdUserData,
        userInfoFields,
      },
    });
  };

  //내 정보 수정하기
  const handleEditClick = () => {
    setEditedUserInfo(createdUserData);
    setViewMode('edit');
  };

  //취소 버튼
  const handleCancelClick = () => {
    setViewMode('info');
  };

  //저장 버튼
  const handleSaveClick = () => {
    setCreatedUserData(editedUserInfo);
    setViewMode('info');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserInfo((prev) => ({
      ...prev,
      [name]: name === 'interestBadgeArray' ? value.split(',') : value,
    }));
  };

  return (
    <div className="my-page">
      <div className="user-info-box">
        <h2 className="myPage-title">마이페이지</h2>
        <button className="view-info-btn" onClick={handleViewInfoClick}>
          내 정보 보기
        </button>
      </div>
      {/* {viewMode === 'info' && (
        <UserInfoBox
          userInfo={createdUserData}
          fields={userInfoFields}
          onEdit={handleEditClick}
        />
      )} */}
      {/* {viewMode === 'edit' && (
        <UserInfoBox
          userInfo={editedUserInfo}
          fields={userInfoFields}
          onChange={handleInputChange}
          onSave={handleSaveClick}
          onCancel={handleCancelClick}
        />
      )} */}
      <div className="my-page-sectionBox">
        <MyPageProfile userInfo={createdUserData} user={user} />
        <StudySection
          studies={studyData}
          handleCompleteRecruit={handleCompleteRecruit}
          selectedOrder={selectedOrder}
        />
        <MyStudyRecruitSection
          userID={createdUserData.userID}
          studies={studyData}
          handleCompleteRecruit={handleCompleteRecruit}
        />
      </div>
    </div>
  );
};

export default MyPage;
