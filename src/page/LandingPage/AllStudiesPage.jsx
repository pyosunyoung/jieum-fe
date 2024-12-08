import React, { useState, useEffect } from "react";
import SubNav from "./components/SubNav";
import SearchBar from "./components/SearchBar";
import StudyList from "./components/StudyList";
import StudyStatus from "./components/StudyStatus";
import "./AllStudiesPage.style.css";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../features/product/productSlice";
import { Col, Container, Row } from "react-bootstrap";

const AllStudiesPage = () => {
  const [selectedTab, setSelectedTab] = useState("전체");
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);
  const [query] = useSearchParams();
  const searchQuery = query.get("query");

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  const filteredProductList = productList.filter((product) => {
    const matchCategory =
      selectedTab === "전체" || (product.category && product.category.includes(selectedTab));
    const matchSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="allstudies-page">
      
      <div className="main-container">
        <div className="left-box">
          <SubNav selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          <div>
            <Container>
              <SearchBar />
              <div className="study-list-title">스터디 모집 글</div>
              <Row>
                {filteredProductList.length > 0 ? (
                  filteredProductList.map((item) => (
                    <div key={item._id}>
                      <StudyList item={item} />
                    </div>
                  ))
                ) : (
                  <div className="text-align-center empty-bag">
                    <h2>{searchQuery ? `${searchQuery}와 일치하는 결과가 없습니다!` : "등록된 게시글이 없습니다!"}</h2>
                  </div>
                )}
              </Row>
            </Container>
          </div>
        </div>
        <div className="right-box">
          <StudyStatus />
        </div>
      </div>
    </div>
  );
};

export default AllStudiesPage;
