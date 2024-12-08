import React, { useEffect } from "react";
import "./Homepage.style.css";
import TopImage from "./components/TopImage";
import StudyColumn from "./components/StudyColumn";
import CharacterSection from "./components/CharacterSection/CharacterSection";
import StudyNote from "./components/StudyNote/StudyNote";
import StudyCarousel from "./components/Carousel/StudyCarousel";
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getProductList } from '../../features/product/productSlice';


const Homepage = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.product.productList);
  const [query] = useSearchParams();
  const name = query.get("name");
  console.log("user", user);
  console.log("productList",productList );
  useEffect(() => {
    dispatch(
      getProductList({
        name,
      })
    );
  }, [query]);
  
  return (
    <div className="study-homepage">
      {user ? (
        <>
          <div className="upper-image-section">
            <CharacterSection />
            <StudyNote />
          </div>
          <div className="study-carousel-section">
            <StudyCarousel productList={productList} user={user}/>
          </div>
        </>
      ) : (
        <TopImage />
      )}

      <div className="recommended-studies-section"></div>

      <div className="category-studies-section">
        <StudyColumn title="인기" productList={productList}/>
        <StudyColumn title="최신" productList={productList} />
        {/* {productList.map((item) => (
            <div  key={item._id}>
              <StudyList item={item} />
            </div>
          ))} */}
    
      </div>
    </div>
  );
};

export default Homepage;
