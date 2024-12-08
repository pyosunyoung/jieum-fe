import './PostTitle.css';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PostProfile from './PostProfile';

const PostTitle = ({ blogPostContent, authorName }) => {
  //모집 중 버튼 상태
  const [isRecruiting, setIsRecruiting] = useState(true);

  return (
    <div>
      <div className="post-title-box">
        {/* 제목 로딩 전 기본 텍스트 표시 */}
        <span className="post-title">{blogPostContent.name}</span>
        <Button disabled={!isRecruiting} className="toRecruit-state">
          {isRecruiting ? '모집 중' : '모집 완료'}
        </Button>
      </div>
      <PostProfile authorName={authorName} blogPostContent={blogPostContent}/>
    </div>
  );
};

export default PostTitle;
