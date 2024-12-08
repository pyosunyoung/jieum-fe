import React from 'react';

//모집 완료 버튼 눌렀을 때 스터디 상태 진행 중으로 변경하기
const RecruitState = ({ study, handleCompleteRecruit }) => {
  return (
    <div>
      {study.status === '모집 중' && (
        <button
          className="complete-recruit-btn"
          onClick={() => handleCompleteRecruit(study.id)}
        >
          모집 완료
        </button>
      )}
    </div>
  );
};

export default RecruitState;
