import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import SearchBox from "../../common/component/SearchBox";
import NewItemDialog from "./component/NewItemDialog";
import ProductTable from "./component/ProductTable";
import {
  getProductList,
  deleteProduct,
  setSelectedProduct,
} from "../../features/product/productSlice";

const AdminProductPage = () => {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const dispatch = useDispatch();
  const { productList, totalPageNum } = useSelector((state) => state.product);
  const [showDialog, setShowDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
  }); //검색 조건들을 저장하는 객체, 해당 url의 page, name값 들고와라

  const [mode, setMode] = useState("new");

  const tableHeader = [
    "#",
    "게시글 태그",
    "게시글 이름",
    "모집인원",
    "스터디 기간",
    "수정 및 삭제",
  ];

  //상품리스트 가져오기 (url쿼리 맞춰서)
  useEffect(()=>{
    dispatch(getProductList({...searchQuery})) // uri 커리가 바뀔 때 마다 호출하고 해당 searchQuery들을 보내겠다.
  }, [query])

  useEffect(() => {
    //검색어나 페이지가 바뀌면 url바꿔주기 (검색어또는 페이지가 바뀜 => url 바꿔줌=> url쿼리 읽어옴=> 이 쿼리값 맞춰서  상품리스트 가져오기)
    if(searchQuery.name === ""){ // 객체의 이름이 없다면 
      delete searchQuery.name; // 이름 필드를 삭제 시킴
    }
    const params = new URLSearchParams(searchQuery); // 검색어를 params url 형태로 바꿔줌 즉 객체를 쿼리 형태로 바꿔줌 page=1&name=jaket 이런식
    const queryString = params.toString() // 문자열로 바꿔줘야 적용됨 serarchQuery객체 => url로 바꿔줌
    // console.log("qqq",query)
    navigate("?" + queryString)// url 변경 완료, useSearchParams를 통해 query값을 익어옴
  }, [searchQuery]);

  const deleteItem = (id) => {
    dispatch(deleteProduct(id));
    //아이템 삭제하가ㅣ
  };

  const openEditForm = (product) => { 
    //edit모드로 설정하고
    setMode("edit")
    // 아이템 수정다이얼로그 열어주기 // 이미 다이얼로그가 채워져 있는 정보를 보내줘야 버튼을 눌렀을 때 확인가능하기 때문에 그정보를 넘겨줘야 함
    dispatch(setSelectedProduct(product))// SelectedProduct를 통해 채워져 있는 정보 받음
    setShowDialog(true);
  };

  const handleClickNewItem = () => {
    //new 모드로 설정하고
    setMode("new")
    // 다이얼로그 열어주기
    setShowDialog(true);
  };

  const handlePageClick = ({ selected }) => { //1페이지를 누르면 
    //  쿼리에 페이지값 바꿔주기
    setSearchQuery({...searchQuery, page:selected + 1});
    console.log("selected", selected);//1페이지를 누르면 0이 나옴 그래서 +1을 해주면 ;됨
  };
  // searchbox에서 검색어를 읽어온다. => 엔터를 치면 => searchQquery객체가 업데이트 됨 {name: 스트레이트 팬츠} 이런식으로
  // => searchQuery객체 안에 아이템 기준으로 url을 새로 생성해서 호출 &name=스트레이트+팬츠 이런식 => url 쿼리 읽어오기 => url 쿼리 기준으로 be에 검색조건과 함께 호출한다.
  return (
    
    <div className="locate-center2">
      {/* <Container> */}
        <div className="mt-2">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="게시글 이름으로 검색"
            field="name"
          />
          
        </div>
        <Button className="mt-2 mb-2 buttonColor" variant="secondary" onClick={handleClickNewItem}>
          글쓰기 +
        </Button>

        <ProductTable
          header={tableHeader}
          data={productList}
          deleteItem={deleteItem}
          openEditForm={openEditForm}
        />
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5} //몇개의 페이지를 보여줄지
          pageCount={totalPageNum} // 전체 페이지가 몇개인지는 백엔드만 알기 때문에 백엔드에서 알려줘야 함
          forcePage={searchQuery.page - 1}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          className="paginate-style list-style-none"
        />
      {/* </Container> */}

      <NewItemDialog
        mode={mode}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </div>
   
  );
};

export default AdminProductPage;
