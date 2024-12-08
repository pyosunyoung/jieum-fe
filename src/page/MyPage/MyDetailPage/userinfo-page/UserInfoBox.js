import React, { useState } from 'react';
import './UserInfoBox.css';

const UserInfoBox = ({ userInfo, fields, onEdit }) => {
  //피그마에 나온 대로, 이름/학과/학번/연락처, 아이디/비밀번호, 각오의 한 마디
  //총 3가지로 정보 그룹화 시키기
  const basicInfoFields = fields.filter(
    (field) =>
      field.name !== 'userID' &&
      field.name !== 'userPassword' &&
      field.name !== 'userAppealPhrase' &&
      field.name !== 'interestBadgeArray'
  );

  const idPasswordFields = fields.filter(
    (field) => field.name === 'userID' || field.name === 'userPassword'
  );

  const appealPhraseFields = fields.filter(
    (field) => field.name === 'userAppealPhrase'
  );

  return (
    <div>
      <h3 className="user-info-title">내 정보</h3>
      <div className="userInfo-box">
        {/* 이름/학과/학번/연락처 정보 */}
        <div className="basic-info-group">
          {basicInfoFields.map((field) => (
            <p key={field.name}>
              <strong>{field.label}</strong>
              {Array.isArray(userInfo[field.name])
                ? userInfo[field.name].join(',')
                : userInfo[field.name]}
            </p>
          ))}
        </div>

        {/* 아이디/비번 정보 */}
        <div className="idPassword-info-group">
          {idPasswordFields.map((field) => (
            <p key={field.name}>
              <strong>{field.label}</strong>
              {field.name === 'userPassword'
                ? '•'.repeat(8)
                : userInfo[field.name]}
            </p>
          ))}
        </div>

        {/* 각오의 한 마디 */}
        <div className="appeal-info-group">
          {appealPhraseFields.map((field) => (
            <p key={field.name}>
              <strong>{field.label}</strong>
              {userInfo[field.name]}
            </p>
          ))}
        </div>
        <button onClick={onEdit} className="info-edit-btn">
          수정
        </button>
      </div>
    </div>
  );
};

export default UserInfoBox;
