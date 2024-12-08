import React from "react";
import CategoryRow from "./CategoryRow";
import { useNavigate } from "react-router-dom";
import categoryArray from "../../../common/studyExampleArray"
import "./HomepageComponent.style.css";
import StudyList from '../../LandingPage/components/StudyList';


const StudyColumn = ({ title, productList }) => {
  const navigate = useNavigate();
// 로컬 스토리지에서 postLikes 데이터 가져오기


// 모든 게시글의 likes 값만 추출

  // 로컬 스토리지에서 postLikes 데이터 가져오기
  const postLikes = JSON.parse(localStorage.getItem("postLikes")) || {};
  const likesArray = Object.keys(postLikes).map((postId) => postLikes[postId].likes);
  // title이 "인기"일 경우 likes 기준으로 정렬
  const sortedProductList =
    title === "인기"
      ? [...productList]
          .filter((item) => postLikes[item._id]) // postLikes에 존재하는 항목만 필터링
          .sort((a, b) => postLikes[b._id].likes - postLikes[a._id].likes) // likes 값으로 정렬
      : [...productList].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ); // 최신순 정렬

  return (
    <div className="category-studies-list">
      <div className="category-title-row">
        <div className="category-green-circle"></div>
        <div className="category-title">{title} 모집 글</div>
      </div>

      <div onClick={() => navigate("/studies")} className="see-more-row">
        더보기
      </div>

      <div className="category-items-box">
        {sortedProductList && sortedProductList.length > 0 ? (
          sortedProductList.map((item, index) => (
            <CategoryRow item={item} key={item._id || index} 
            likes={title === "인기" ? postLikes[item._id]?.likes || 0 : null} 
            />
          ))
        ) : (
          <p>해당 조건에 맞는 게시물이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default StudyColumn;

