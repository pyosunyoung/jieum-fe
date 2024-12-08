import React from 'react';
import './StudyForm.css';
import { Description } from '@mui/icons-material';

const StudyForm = ({ studyInfo, weeklySchedule }) => {
  return (
    <div className="study-condition">
      <p>
        <strong>세부영역 |</strong>
        {studyInfo.category.map((badge, index) => (
          <span key={index}>
            #{badge}
            {index < studyInfo.category.length - 1 && ' '}
          </span>
        ))}
        <span> #{studyInfo.sku}</span>
      </p>
      <p>
      <strong>스터디 기간 |</strong> {Object.keys(weeklySchedule).length}주
      </p>
      <p>
        <strong>모집 인원 |</strong>
        {studyInfo.limitlessRecruit ? '제한 없음' : `${studyInfo.price}명`}
      </p>

      <div className="study-schedule">
        <h3>학습 일정</h3>
        <ul>
          {Object.keys(weeklySchedule).map((week, index) => (
            <li key={week}>
              <strong>{index + 1}주차 |</strong> {week}
            </li>
          ))}
        </ul>
      </div>
      {console.log('weeklySchedule', weeklySchedule)}
    </div>
  );
};

export default StudyForm;
