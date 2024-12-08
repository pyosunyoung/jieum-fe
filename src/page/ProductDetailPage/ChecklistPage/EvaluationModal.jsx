import React, { useState } from "react";
import "./EvaluationModal.css";
import { useDispatch } from 'react-redux';
import { evaluateMemberTemperature } from '../../../features/user/userSlice';

const EvaluationModal = ({ members, currentUser, onClose }) => {
  const dispatch = useDispatch();

  const handleEvaluation = (memberKey, score) => {
    // Redux를 통해 상태 업데이트
    dispatch(evaluateMemberTemperature({ memberKey, score }));
    alert(`${memberKey}의 온도점수 +${score}점 부여`);
  };
  
  return (
    <div className="evaluation-modal-overlay">
      <div className="evaluation-modal-content">
        <h2 className="evaluation-modal-title">스터디원 상호 평가</h2>
        <div className="evaluation-modal-list">
          {members
            .filter((member) => member.name !== currentUser) // 나 자신 제외
            .map((member) => (
              <div className="evaluation-modal-member" key={member.key}>
                <span className="evaluation-modal-member-name">{member.name}</span>
                <div className="evaluation-modal-buttons">
                  <button
                    className="evaluation-modal-good-button"
                    onClick={() => handleEvaluation(member.key, 3)}
                  >
                    잘했다
                  </button>
                  <button
                    className="evaluation-modal-average-button"
                    onClick={() => handleEvaluation(member.key, 1)}
                  >
                    보통이다
                  </button>
                  <button
                    className="evaluation-modal-bad-button"
                    onClick={() => handleEvaluation(member.key, -3)}
                  >
                    못했다
                  </button>
                </div>
              </div>
            ))}
        </div>
        <button className="evaluation-modal-close-button" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default EvaluationModal;
