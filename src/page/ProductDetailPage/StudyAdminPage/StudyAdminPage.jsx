import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaEdit, FaCrown, FaEllipsisV } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import './StudyAdminPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail } from '../../../features/product/productSlice';

const StudyAdminPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct } = useSelector((state) => state.product);
  
  console.log('selectedProduct', selectedProduct);

  const [selectedMemberIndex, setSelectedMemberIndex] = useState(null);
  const { id } = useParams();
  useEffect(() => { // 새로고침
    dispatch(getProductDetail(id));
  }, [id, dispatch]);
  
  const studyPlan = [
    { week: 1, description: 'HTML & CSS 기초 학습, JavaScript 기본 문법 복습' },
    { week: 2, description: 'React 기초 및 컴포넌트 구조 이해' },
    { week: 3, description: '간단한 웹 프로젝트 진행' },
    { week: 4, description: '간단한 웹 프로젝트 진행2' },
  ];
  const selectedProductPlan = selectedProduct.stock;
  const selectedProductPlanArray = Object.entries(selectedProductPlan).map(([key, value]) => ({
    key,
    value,
  }));
  
  // 주차별 계획 수정 페이지로 이동
  const handleEditPlanClick = (index) => {
    navigate(`/product/${id}/manage-study/StudyAdminPage/EditPlanPage/${index+1}`);
  };
 

  const members = [
    {
      name: '정기찬',
      role: '스터디장',
      department: '컴퓨터공학부',
      studentId: '22학번',
      passion: '30도',
    },
    {
      name: '표선영',
      department: '컴퓨터공학부',
      studentId: '20학번',
      passion: '31도',
    },
    {
      name: '박정효',
      department: '첨단IT학부',
      studentId: '22학번',
      passion: '33도',
    },
    {
      name: '고하늘',
      department: '컴퓨터공학부',
      studentId: '21학번',
      passion: '35도',
    },
    {
      name: '김주은',
      department: '컴퓨터공학부',
      studentId: '22학번',
      passion: '33도',
    },
  ];

  // 멤버 선택 상태 관리
  const handleMemberEditClick = (index) => {
    setSelectedMemberIndex(selectedMemberIndex === index ? null : index);
  };

  const handleRemoveMember = (index) => {
    alert(`${members[index].name}님이 퇴출되었습니다.`);
    // Logic to remove the member from the list
  };

  return (
    <div className="study-admin-display-box">
      <div className="admin-page-container">
        {/* Header Section */}
        <div className="header-section">
          <h2>{selectedProduct?.sku} (관리)</h2>
        </div>

        <div className="content-container">
          {/* Study Plan Section */}
          <div className="study-plan-container">
            <h3 className="study-plan-header">주차별 계획</h3>
            {selectedProductPlanArray.map((plan, index) => (
  <div key={index} className="study-plan-item">
    {/* 배열의 개수는 주차에 표시 */}
    <span className="study-plan-week">{`${index + 1}주차:`}</span>
    
    {/* key 값은 설명에 표시 */}
    <span className="study-plan-description">{plan.key}</span>

    <FaEdit
      className="edit-icon"
      title="수정"
      onClick={() => handleEditPlanClick(index)}
    />
  </div>
))}
            <small className="study-plan-note">
              * 상세 계획을 작성해보세요.
            </small>
          </div>

          {/* Members Section */}
          <div className="members-section-container">
            <h3 className="members-header">멤버 ({members.length})</h3>
            {members.map((member, index) => (
              <div key={index} className="member-item">
                <FaUserCircle className="member-icon" />
                <div className="member-details">
                  <div className="member-header">
                    <span className="member-name">{member.name}</span>
                    {member.role && (
                      <span className="member-role">
                        {member.role}
                        <FaCrown className="crown-icon" />
                      </span>
                    )}
                  </div>
                  <span className="member-info">
                    {member.department} {member.studentId}
                  </span>
                  <span className="member-passion">
                    열정온도: {member.passion}
                  </span>
                </div>
                <div className="edit-section">
                  <FaEllipsisV
                    className="edit-icon"
                    title="수정"
                    onClick={() => handleMemberEditClick(index)}
                  />
                  {selectedMemberIndex === index && (
                    <button
                      className="remove-member-btn"
                      onClick={() => handleRemoveMember(index)}
                    >
                      퇴출하기
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyAdminPage;
