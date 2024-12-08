import React from "react";
import CarouselItem from "./CarouselItem";
import categoryArray from "../../../../common/studyExampleArray";
import Carousel from "react-multi-carousel";
import responsive from "./responsive/responsive";
import "react-multi-carousel/lib/styles.css";
import "../HomepageComponent.style.css";
import { useNavigate } from 'react-router';

const StudyCarousel = ({ productList, user }) => {
  const navigate = useNavigate(); // useNavigate 훅으로 네비게이션 설정

  // 앞에 # 제거한 새로운 배열 생성
  const interestTags = user.InterestTag.map(tag => tag.replace("#", ""));

  // productList에서 category와 interestTags를 비교하여 일치하는 항목을 교집합 크기에 따라 정렬
  const sortedProducts = productList
    .map(product => ({
      ...product,
      matchCount: product.category.filter(category => interestTags.includes(category)).length, // 교집합 크기 계산
    }))
    .filter(product => product.matchCount > 0) // 매칭되는 항목만 필터링
    .sort((a, b) => b.matchCount - a.matchCount); // 교집합 크기에 따라 내림차순 정렬

  // 카드 클릭 핸들러
  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  console.log("sortedProducts", sortedProducts);

  return (
    <>
      <div className="carousel-section-title">맞춤형 추천 스터디</div>
      <div className="carousel-container">
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          arrows={false}
          responsive={responsive}
          infinite={false}
          autoPlay={true}
          autoPlaySpeed={4000}
          transitionDuration={200}
          containerClass="carousel-inner-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {sortedProducts.map(item => (
            <div
              key={item._id}
              onClick={() => handleCardClick(item._id)} // 클릭 시 handleCardClick 호출
              style={{ cursor: "pointer" }} // 클릭 가능한 UI 표시
            >
              <CarouselItem item={item} />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default StudyCarousel;
