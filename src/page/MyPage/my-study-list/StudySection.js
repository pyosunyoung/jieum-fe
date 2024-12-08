import React, { useState } from 'react';
import './StudySection.css';
import './StudyList';
import StudyList from './StudyList';

const StudySection = ({ studies, handleCompleteRecruit,selectedOrder }) => {
  const filteredData = studies.filter((study) => study.status !== '모집 중');
  console.log("selectedOrder", selectedOrder)
  return (
    <div>
      <h3 className="myStudy-list-title">- 내 스터디</h3>
      <div className="study-section">
        <div className="study-status-filter">
          <button className="status-btn">전체</button>
          <div className="study-list">
            {filteredData.length > 0 ? (
              <StudyList
                studies={filteredData}
                handleCompleteRecruit={handleCompleteRecruit}
                selectedOrder={selectedOrder}
              />
            ) : (
              <p>해당하는 스터디가 없습니다</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudySection;
