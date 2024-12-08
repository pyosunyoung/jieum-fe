import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FaUserCircle } from "react-icons/fa";

import "./ChecklistPage.css";
import { adminIncreaseTemperature, getTemperature, increaseTotalTemperature, updateChecklist } from "../../../features/user/userSlice";
import EvaluationModal from './EvaluationModal';

// WeekChecklist Component
const WeekChecklist = ({ index, week, checked, onCheck, id, userRole }) => {
  const manageStudyPath =
    userRole === "admin"
      ? `/product/${id}/manage-study/StudyAdminPage`
      : `/product/${id}/StudyTeammatePage/${index}`;

  return (
    <div className="week-checklist">
      <input
        type="checkbox"
        className="check-box"
        checked={checked}
        onChange={userRole === "admin" ? onCheck : null} // customer는 체크 금지
        disabled={userRole !== "admin"} // 체크박스 비활성화
      />
      <Link to={manageStudyPath} className="week-todo">
        {`${index + 1}주차: ${week}`}
      </Link>
    </div>
  );
};

// MemberProgress Component
const MemberProgress = ({ name }) => (
  <div className="members-name">
    <FaUserCircle className="user-icon" />
    <span className="members-name-text">{name}</span>
  </div>
);

// ProgressSection Component
const ProgressSection = ({ progress, selectedProduct, id, userRole }) => (
  <div className="progress-section">
    <div className="Cl-header">
      <h4 className="Cl-study-title">{selectedProduct?.sku || "스터디"}</h4>
      {userRole === "admin" && (
        <Link to={`/product/${id}/manage-study/StudyAdminPage`} className="week-todo">
          스터디 관리 바로가기
        </Link>
      )}
    </div>
    <div className="progress-container">
      <div className="weekly-content">
        <div className="weekly-progressbar">
          <span>진행 상황</span>
          <div className="progress-wrapper">
            <ProgressBar now={progress} className="custom-progress-bar" />
            <span className="progress-percent">{`${progress.toFixed(0)}%`}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// MembersContent Component
const MembersContent = ({ members }) => (
  <div className="members-content">
    <h5 className="members-header-text">멤버별 진행 상황</h5>
    {members.map((member, index) => (
      <MemberProgress key={index} name={member} />
    ))}
  </div>
);

// ChecklistContent Component
const ChecklistContent = ({ weeks, completed, onCheck, id, userRole }) => (
  <div className="checklist-content">
    <div className="checklist-header">
      <h5 className="check-header-text">- 체크리스트</h5>
    </div>
    {weeks.map((week, index) => (
      <WeekChecklist
        key={index}
        id={id}
        index={index}
        week={week}
        checked={completed[index]}
        onCheck={() => onCheck(index)}
        userRole={userRole}
      />
    ))}
  </div>
);

// ChecklistPage Component
const ChecklistPage = () => {
  const { selectedProduct } = useSelector((state) => state.product);
  const { user, completed, totaltemperature  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    // 페이지 로드 시 서버에서 temperature 값 가져오기
    dispatch(getTemperature());
  }, [dispatch]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const members = [
    { name: "표선영", key: "pyoTemperature" },
    { name: "정기찬", key: "jungTemperature" },
    { name: "고하늘", key: "koTemperature" },
    { name: "김주은", key: "kimTemperature" },
    { name: "박정효", key: "parkTemperature" },
  ];
  const currentUser = user.name; // 현재 사용자 예시

  // `selectedProduct.stock`를 배열로 변환
  const stockArray = Object.values(selectedProduct.stock || []);
  const totalWeeks = stockArray.length;

  // 제품별 completed 상태 가져오기
  const productCompleted = completed[selectedProduct._id] || Array(totalWeeks).fill(false);

  // 진행률 계산
  const progress =
    (productCompleted.filter(Boolean).length / totalWeeks) * 100;

  // 체크박스 클릭 핸들러
  const handleCheck = (index) => {
    dispatch(updateChecklist({ productId: selectedProduct._id, weekIndex: index }));
    if (user?.level === "admin") {
      dispatch(adminIncreaseTemperature());
    }
  };
  const handleStudyComplete = () => {
    const updatedTemperature = totaltemperature + 25;
    localStorage.setItem("totaltemperature", updatedTemperature);
    dispatch(increaseTotalTemperature(updatedTemperature));
    alert("스터디가 완료되었습니다! 홈으로 이동합니다.");
    navigate("/"); // 홈페이지로 이동
  };
  
  return (
    <div className="display-center">
      <div className="main-content">
        <ProgressSection
          id={id}
          progress={progress}
          selectedProduct={selectedProduct}
          userRole={user?.level}
        />
        <MembersContent members={["김주은", "고하늘", "표선영", "박정효"]} />
      </div>
      <ChecklistContent
        id={id}
        weeks={Object.keys(selectedProduct.stock)}
        completed={productCompleted}
        onCheck={handleCheck}
        userRole={user?.level}
      />
      {productCompleted.every(Boolean) && (
        <div className="buttons-container">
        {progress === 100 && (
          <>
            {user?.level === "admin" && (
              <>
                <button onClick={handleStudyComplete}>스터디 완료</button>
                <button onClick={() => setIsModalOpen(true)}>스터디원 상호 평가</button>
              </>
            )}
            {user?.level === "customer" && (
              <button onClick={() => setIsModalOpen(true)}>스터디원 상호 평가</button>
            )}
            {isModalOpen && (
        <EvaluationModal
          members={members}
          currentUser={currentUser}
          onClose={() => setIsModalOpen(false)}
        />
      )}
          </>
        )}
      </div>
      )}
    </div>
  );
};

export default ChecklistPage;
