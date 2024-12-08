import React, { useState } from 'react';
// npm install sweetalert2
import Swal from 'sweetalert2';
import './StudyApply.css';

const StudyApply = ({ onApplicantAdd, userName, studyInfo }) => {
  const handleApply = () => {
    Swal.fire({
      title: '신청 완료 하시겠습니까?',
      showCancelButton: true,
      confirmButtonColor: '#DADEAA',
      cancelButtonColor: '#FF5555',
      confirmButtonText: '신청',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '신청 완료되었습니다',
          text: '마이페이지에서 내역을 확인해 보세요',
          icon: 'success',
        });
      }
    });

    const newApplicant = {
      name: userName,
      category: studyInfo.category,
      blogTitle: studyInfo.blogTitle,
      authorName: studyInfo.authorName, //스터디 글 작성자 이름
      timestamp: new Date().toLocaleString(),
    };

    onApplicantAdd(newApplicant);
  };

  return (
    <div className="study-recruit-button-box">
      {/* <button className="apply-button" onClick={handleApply}>
        신청하기
      </button> */}
    </div>
  );
};

export default StudyApply;
