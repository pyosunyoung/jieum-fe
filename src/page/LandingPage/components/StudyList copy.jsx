import React, { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import './StudyList.css';
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../../../utils/number";

const StudyList = ({ selectedTab, item }) => {
  //초기 데이터 예시!!! 새로운 게시물 등록 시 이 배열에 추가될 수 있도록....
  const navigate = useNavigate();
  const showProduct = (id) => {
    navigate(`/product/${id}`);
  };
  // const allItems = [
  //   {
  //     id: 1,
  //     subject: item?.name,
  //     interestBadgeArray: ['#전공','#컴퓨터공학부','#파이썬 프로그래밍'],
  //     blogPostContent:{
  //       blogTitle: '파이썬 스터디 할 분 모집'
  //     },
  //     category: '전공',
  //   },
  //   { 
  //     id: 2, 
  //     subject: "웹프로그래밍",
  //     interestBadgeArray: ['#자기개발','#개발','#웹프로그래밍'], 
  //     blogPostContent:{
  //       blogTitle:'웹 개발 스터디 모집'
  //     },
  //     category: '전공' },
  //   { 
  //     id: 3, 
  //     subject: "인문학",
  //     interestBadgeArray: ['#자기개발','#어학','#인문학'], 
  //     blogPostContent:{
  //       blogTitle:'인문학 독서 모임'
  //     },
  //     category: '교양' },
  //   {
  //     id: 4,
  //     subject: "기독교세계관",
  //     interestBadgeArray: ['#교양','#사랑의 실천','#기독교세계관'],
  //     blogPostContent:{
  //       blogTitle:'자기개발 스터디 모집'
  //     },
  //     category: '자기개발',
  //   },
  // ];

  // const filteredItems = allItems.filter(
  //   (item) => selectedTab === '전체' || item.category === selectedTab
  // );

  return (
    <div className="study-section">
      <div className='study-list-title'>스터디 모집 글</div>
      <div className="study-items">
        {filteredItems.map((item) => (
          <div className="study-item" key={item.id}>
            <div className='item-badge-section'>
              <span className='list-badge-style recruit-badge'>모집중</span>
              {item.interestBadgeArray.map((badge)=>(
                <span className='list-badge-style'>{badge}</span>
              ))}
            </div>
            
            <div className='study-item-title-section'>
              <div className='study-item-subtitle sub-text'>#{item.subject}</div>
              <div className="study-item-title">{item.blogPostContent.blogTitle}</div>
            </div>

            <div className='study-item-button-section'>
              <FavoriteBorderIcon className="study-item-icon" />
              <div className="icon-number">{item.likes||0}</div>
              <ArchiveOutlinedIcon className="study-item-icon"/>
              <div className="icon-number">{item.favorites||2}</div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyList;
