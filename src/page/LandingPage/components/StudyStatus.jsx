import React, { useState } from 'react';
import './StudyStatus.css';

const StudyStatus = () => {
  const [ongoingStudies, setOngoingStudies] = useState([
    '파이썬 프로그래밍',
    '인간발달 교육',
    '마케팅 관리론',
  ]);

  const [completedStudies, setCompletedStudies] = useState([
    'JAVA 프로그래밍',
    '과학기술 글쓰기',
  ]);

  return (
    <div className="study-status-box">
      <div className="studyStatus-title">스터디 현황</div>
      <div className="study-status">
        <div className="status-content">
          <div className="content-title">
            <div className='circle green-circle'></div>
            참여 중
          </div>
          <ul className="status-list">
            {ongoingStudies.map((study, index) => (
              <li key={index} className="status-item">{study}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="content-title">
            <div className='circle gray-circle'></div>
            완료
          </div>
          <ul className="status-list">
            {completedStudies.map((study, index) => (
              <li key={index} className='status-item'>{study}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudyStatus;
