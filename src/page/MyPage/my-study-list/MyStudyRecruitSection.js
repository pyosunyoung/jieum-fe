import React from 'react';
import StudyList from './StudyList';
import './MyStudyRecruitSection.css';

const MyStudyRecruitSection = ({ userID, studies, handleCompleteRecruit }) => {
  //상태가 모집 중인 것만!! 필터링
  const recruitingStudies = studies.filter(
    (study) =>
      study.status === '모집 중' && study.studyInfo.createdBy === userID
  );

  return (
    <div>
      <div className="my-recruitStudyList-title-section">
        <h3 className="my-recruitStudy-list-title">- 모집 중인 스터디 내역</h3>
        <p>*멤버 승인을 통해 스터디 모집을 완료해보세요</p>
      </div>

      <div className="my-recruitStudy-section">
        {recruitingStudies.length > 0 ? (
          <StudyList
            studies={recruitingStudies}
            handleCompleteRecruit={handleCompleteRecruit}
          />
        ) : (
          <p>모집 중인 스터디가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MyStudyRecruitSection;
