import React, { useState } from 'react';
import './Check.css';
import PostTitle from '../PostUpContainer/PostTitle';
import StudyForm from './StudyForm';
import UserComment from './comment/UserComment';
import StudyApply from './StudyApply';
import ReactionBox from './comment/ReactionBox';

const Check = ({selectedProduct, user}) => {
  const [applicants, setApplicants] = useState([]);
  const [comments, setComments] = useState([]);
  
  
  //우선 초기값 설정해 뒀습니다!!!
  const createdStudyData = {
    studyInfo: {
      category: '전공',
      subCategory: '컴퓨터공학부',
      subject: 'C언어 프로그래밍',
      studyPeriod: 4,
      recruitSize: 7,
      limitlessRecruit: false,
      interestBadgeArray: ['전공', '컴퓨터공학부', 'C언어 프로그래밍'],
    },
    weeklySchedule: {
      week1: '스터디 재미있게 해요~',
      week2: '스터디 재미잇게 해여',
      week3: '우아아아아아아아아악',
      week4: '짱구는 못 말려',
    },
    blogPostContent: {
      blogTitle: '리액트 스터디 모집합니다.',
      blogContent: '스터디 같이 해여',
    },
    authorName: '정기찬',
  };

  const handleApplicantAdd = (newApplicant) => {
    setApplicants((prevApplicants) => [...prevApplicants, newApplicant]);
  };

  //댓글 추가
  const handleCommentAdd = (
    newComment,
    isReply = false,
    parentIndex = null
  ) => {
    setComments((prevComments) => {
      const updatedComments = [...prevComments];

      //댓글이면 댓글 추가
      if (isReply && parentIndex !== null) {
        updatedComments[parentIndex].replies.push(newComment);
      } else {
        //답글이면 답글 추가
        updatedComments.push({ text: newComment, replies: [] });
      }
      return updatedComments;
    });
  };

  //총 댓글 수
  const totalCommentCount = comments.reduce(
    (count, comment) => count + 1 + comment.replies.length,
    0
  );

  return (
    <div className="study-recruit-check-box">
      <PostTitle
        blogPostContent={selectedProduct}
        authorName={user.name}
      />
      <StudyForm
        studyInfo={selectedProduct}
        weeklySchedule={selectedProduct.stock}
      />

      <p className="study-description">
        {selectedProduct.description}
      </p>

      <StudyApply
        onApplicantAdd={handleApplicantAdd}
        userName={'고하늘'}
        studyInfo={createdStudyData.studyInfo}
      />
      <ReactionBox commentCount={totalCommentCount} />
      <UserComment onCommentAdd={handleCommentAdd} />
    </div>
  );
};

export default Check;
