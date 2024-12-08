import React, { useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FaUserCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import "./ChecklistPage.css";
import { useSelector } from 'react-redux';

const WeekChecklist = ({ index, week, description, link, checked, onCheck, id, userRole }) => {
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
        onChange={onCheck}
      />
      <Link to={manageStudyPath} className="week-todo">
        {`${index + 1}주차: ${week}`}
      </Link>
    </div>
  );
};

const MemberProgress = ({ name }) => (
  <div className="members-name">
    <FaUserCircle className="user-icon" />
    <h9 className="members-name-text">{name}</h9>
  </div>
);

const ProgressSection = ({ week, title, progress,selectedProduct,id,userRole }) => (
  <div className="progress-section">
    <div className="Cl-header">
      <h4 className="Cl-study-title">{selectedProduct.sku}</h4>
      {userRole === "admin" && (
        <Link to={`/product/${id}/manage-study/StudyAdminPage`} className="week-todo">
          스터디 관리 바로가기
        </Link>
      )}
    </div>
    <div className="progress-container">
      <div className="weekly-content">
        <div className="weekly-header">
          <h7 className="week-info">{`1주차`}</h7>
          <h3>{title}</h3>
        </div>
        <div className="weekly-progressbar">
          <h9>개인 진행 상황</h9>
          <div className="progress-wrapper">
            <ProgressBar now={progress} className="custom-progress-bar" />
            <span className="progress-percent">{`${progress.toFixed(
              0
            )}%`}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MembersContent = ({ members }) => (
  <div className="members-content">
    <h7 className="members-header-text">멤버별 진행 상황</h7>
    {members.map((member, index) => (
      <MemberProgress key={index} name={member} />
    ))}
  </div>
);

const ChecklistContent = ({ weeks, completed, onCheck,selectedProduct,id,userRole }) => (
  <div className="checklist-content">
    <div className="checklist-header">
      <h5 className="check-header-text">- 체크리스트</h5>
    </div>
    {Object.keys(selectedProduct).map((week, index) => (
      <WeekChecklist
      id={id}
      index={index}
      week={week}
        // week={week.week} // length주고
        description={week.description} // 키값 추줄 하면 될듯
        link={week.link}
        checked={completed[index]}
        onCheck={() => onCheck(index)}
        userRole={userRole}
      />
    ))}
  </div>
);

const ChecklistPage = () => {
  const { selectedProduct, loading } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user); 
  const {id} = useParams();
  console.log("id",user)
  
  const weeks = [
    { week: 1, description: "HTML & CSS 기초 학습", link: "/checklist/week1" },
    {
      week: 2,
      description: "React 기초 및 컴포넌트 구조 이해",
      link: "/checklist/week2",
    },
    { week: 3, description: "간단한 프로젝트 제작", link: "/checklist/week3" },
    { week: 4, description: "최종 프로젝트 진행", link: "/checklist/week4" },
  ];

  const [completed, setCompleted] = useState(Array(weeks.length).fill(false));
  const progress = (completed.filter(Boolean).length / weeks.length) * 100;

  const handleCheck = (index) => {
    const updated = [...completed];
    updated[index] = !updated[index];
    setCompleted(updated);
  };

  const members = ["김주은", "고하늘", "표선영", "박정효"];

  return (
    <div className="display-center">
      <div className="main-content">
        <ProgressSection
          id={id}
          week={8}
          title={Object.keys(selectedProduct.stock)[0]}
          progress={progress}
          selectedProduct={selectedProduct}
          userRole={user?.level}
        />
        <MembersContent members={members} />
      </div>
      <ChecklistContent
        id={id}
        weeks={weeks}
        completed={completed}
        selectedProduct={selectedProduct.stock}
        onCheck={handleCheck}
        userRole={user?.level}
      />
    </div>
  );
};

export default ChecklistPage;
