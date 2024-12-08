import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./WeekTodoPage.css";
import { useSelector } from 'react-redux';

const WeekTodoPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const { selectedProduct } = useSelector((state) => state.product);
  console.log("selectedProductid ",id )
  
  // const weekDetails = {
  //   week1: {
  //     title: "1주차: HTML & CSS 기초 학습, JavaScript 기본 문법 복습",
  //     tasks: [
  //       "HTML 구조와 태그 이해하기 (헤더, 섹션, 푸터)",
  //       "CSS 기본 스타일링 (색상, 배경, 폰트)",
  //       "CSS Flexbox와 Grid 기초 학습",
  //       "JavaScript 기본 문법 복습 (변수, 조건문, 반복문)",
  //       "기본 HTML/CSS 및 JavaScript를 활용한 간단한 프로젝트 구성",
  //     ],
  //     assignment: "학습 내용 사진찍어서 업로드하기",
  //   },
  //   week2: {
  //     title: "2주차: React 기초 및 컴포넌트 구조 이해",
  //     tasks: [
  //       "React의 주요 개념과 JSX 학습",
  //       "컴포넌트 생성 및 Props/State 이해",
  //       "React Router를 활용한 간단한 라우팅 구현",
  //       "React Hook (useState, useEffect) 학습 및 실습",
  //       "React로 TodoList 컴포넌트 만들기",
  //     ],
  //     assignment: "React 기반 컴포넌트 설계 및 결과물 공유",
  //   },
  // };

  // const currentWeek = weekDetails[weekId];

  // if (!currentWeek) {
  //   return <p>해당 주차 정보를 찾을 수 없습니다.</p>;
  // }
  const currentWeek = {
    0: {
      tasks: [
              "HTML 구조와 태그 이해하기 (헤더, 섹션, 푸터)",
              "CSS 기본 스타일링 (색상, 배경, 폰트)",
              "CSS Flexbox와 Grid 기초 학습",
              "JavaScript 기본 문법 복습 (변수, 조건문, 반복문)",
              "기본 HTML/CSS 및 JavaScript를 활용한 간단한 프로젝트 구성",
            ],
    },
    1: {
      tasks: [
              "React의 주요 개념과 JSX 학습",
              "컴포넌트 생성 및 Props/State 이해",
              "React Router를 활용한 간단한 라우팅 구현",
              "React Hook (useState, useEffect) 학습 및 실습",
              "React로 TodoList 컴포넌트 만들기",
            ],
    },
    2: {
      tasks: [
        "API 통신을 위한 기본 개념 학습 (REST API, HTTP 메서드)",
        "Axios 또는 Fetch를 활용한 외부 데이터 가져오기",
        "컴포넌트 간 데이터 전달 및 Context API 학습",
        "React Query를 사용한 데이터 상태 관리",
        "API 데이터를 활용한 간단한 CRUD 애플리케이션 제작",
      ],
    },
    3: {
      tasks: [
        "React 애니메이션 및 사용자 경험 개선 기술 학습 (React Transition Group, Framer Motion)",
        "성능 최적화를 위한 React.memo 및 useCallback 이해",
        "Redux 또는 Zustand를 활용한 전역 상태 관리 학습",
        "Typescript를 React 프로젝트에 통합하여 타입 안정성 높이기",
        "최종 프로젝트: 개인 또는 팀으로 대규모 웹 애플리케이션 제작",
      ],
    },
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  const handleSubmit = () => {
    if (uploadedFile) {
      alert(`${uploadedFile.name} 파일이 업로드되었습니다.`);
    } else {
      alert("업로드할 파일을 선택하세요.");
    }
  };

  const tasks = currentWeek[id]?.tasks || []; // id에 해당하는 tasks가 없으면 빈 배열 반환

  return (
    <div className="display-center">
      <div className="week-todo-page">
        <div className="header">
          <h1>{selectedProduct.name}</h1>
        </div>
        <div className="content">
          <div className="content-card">
            <h2 className="week-title">{`${Number(id)+1}주차 : `}{Object.keys(selectedProduct.stock)[id]}</h2>
            <div className="tasks">
              <h3>학습 내용:</h3>
              <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
            </div>
          </div>
          <div className="upload-card">
            <h3>과제 제출</h3>
            {/* <p>{currentWeek.assignment}</p> */}
            <div className="upload-section">
              <input
                type="file"
                id="upload-input"
                onChange={handleFileChange}
                className="upload-input"
              />
              <div className="upload-actions">
                <label htmlFor="upload-input" className="upload-label">
                  파일 업로드
                </label>
                <button className="submit-button" onClick={handleSubmit}>
                  제출하기
                </button>
              </div>
              {uploadedFile && (
                <div className="file-info">
                  <p>선택된 파일: {uploadedFile.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <button className="back-button" onClick={() => navigate("/checklist")}>
          목록으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default WeekTodoPage;
