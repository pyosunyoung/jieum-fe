import React, { useState, useEffect } from 'react';
import { Form, Modal, Button, Row, Col, Alert, Dropdown, DropdownButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CloudinaryUploadWidget from '../../../utils/CloudinaryUploadWidget';
import { CATEGORY, STATUS, SIZE } from '../../../constants/product.constants';
import '../style/adminProduct.style.css';
import {
  clearError,
  createProduct,
  editProduct,
} from '../../../features/product/productSlice';
import { image } from '@cloudinary/url-gen/qualifiers/source';
import RecruitSlider from './RecruitSlider';
import RecruitRadioButton from './RecruitRadioButton';

const MAIN_CATEGORIES = ['전공', '교양', '자기개발'];
const SUB_CATEGORIES = {
  전공: ["간호학과",
            "경상학부",
            "경찰학부",
            "관광학부",
            "기독교학부",
            "디자인영상학부",
            "문화예술학부",
            "보건학부",
            "사범학부",
            "사회복지학부",
            "스포츠과학부",
            "어문학부",
            "외식산업학부",
            "첨단IT학부",
            "컴퓨터공학부",
            "혁신융합학부",],
  교양: ["글로벌 역량",
            "균형",
            "논리/비판적 사고",
            "대인관계",
            "리더십",
            "맞춤형 글쓰기",
            "발표와 토론",
            "사랑의 실천",
            "사회봉사",
            "수학/기초과학",
            "외국어",
            "정보기술",
            "창의 융합 교양",
            "협업 및 기타소양",],
  자기개발: ['어학', '취업', '취미',"개발", "기타"],
};
const InitialFormData = {
  name: '',
  sku: '',
  stock: {},
  image: '',
  description: '',
  category: [],
  status: 'active',
  price: 0,
  pushcategory:["", "", ""] 
};

const NewItemDialog = ({ mode, showDialog, setShowDialog }) => {
  const { error, success, selectedProduct } = useSelector(
    (state) => state.product
  );
  const [formData, setFormData] = useState(
    // mode가 new라면 init이걸 쓰겠다.
    mode === 'new' ? { ...InitialFormData } : selectedProduct // 새로만드는 것이면 initial넣어주고 아니라면 selectedProduct(수정값)로 설정
  );
  const [stock, setStock] = useState([]); // [[],[],[]] 이렇게 늘어나는 구조
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [stockError, setStockError] = useState(false);
  // console.log("stock", stock);
  const [page, setPage] = useState(1); // 페이지 상태
  const [limitlessRecruitBoolean, setLimitlessRecruitBoolean] = useState(false);
  
  const handlePriceChange = (price) => {
    // 슬라이더 값 변경 시 formData 업데이트
    setFormData({ ...formData, price });
  };
  const handleRecruitRadio = () => {
    // "제한 없음" 클릭 시 활성화/비활성화 토글
    const isLimitless = !limitlessRecruitBoolean;
    setLimitlessRecruitBoolean(isLimitless);
    if (isLimitless) {
      // 제한 없음 활성화: price를 99로 설정
      setFormData({ ...formData, price: 99 });
    } else {
      // 제한 없음 비활성화: price를 초기값(슬라이더의 기본값)으로 설정
      setFormData({ ...formData, price: 2 });
    }
  };
const handleNextPage = () => {
  setPage(2);
};

const handlePreviousPage = () => {
  setPage(1);
};
  useEffect(() => {
    if (success) setShowDialog(false); // 성공적으로 submit했으면 다이어로그 즉 팝업창 닫아주는 로직
  }, [success]); // 성공못했으면 그대로 열어 놓음

  useEffect(() => {
    if (error || !success) {
      dispatch(clearError());
    }
    if (showDialog) {
      if (mode === 'edit') {
        setFormData(selectedProduct);
        // 객체형태로 온 stock을  다시 배열로 세팅해주기
        const sizeArray = Object.keys(selectedProduct.stock).map((size) => [
          size,
          selectedProduct.stock[size],
        ]);
        setStock(sizeArray);
      } else {
        setFormData({ ...InitialFormData });
        setStock([]);
      }
    }
  }, [showDialog]);

  const handleClose = () => {
    //모든걸 초기화시키고;
    // 다이얼로그 닫아주기
     // 1. 초기화할 상태 예시
  

  // 2. 모달 닫기
  setShowDialog(false); // 모달을 닫음
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("formdata", formData); // stock은 안들어가 있음 이유 :  fomdata stock
    // console.log("formdata",stock); // state stock
    //stock은 state에 stock을 저장했음 array로 하지만 우리는 객체 타입으로 init에 저장시킴 객체로 보내려고
    // 그래서 array에 있는 stock값을 init stock{}객체로 보내면 됨
    //[["s","3"], ["m","4"]] => {s:3,m:4} 이렇게 바꿔줘야 함
    //재고를 입력했는지 확인, 아니면 에러
    if (stock.length === 0) return setStockError(true);
    setStockError(false);
    // 재고를 배열에서 객체로 바꿔주기
    const totalStock = stock.reduce((total, item) => {
      // total 누적값 item:[["s","3"], ["m","4"]] 가져옴
      return { ...total, [item[0]]: parseInt(item[1]) }; //s, 3를 읽어와서 {키, 값}으로 변경해준 코드 , parseint는 문자열을 숫자로 바꾸려고 설정
    }, {}); // reduce array을 읽어와서 내가 원하는 값의 형태로 변경 가능
    console.log('formdatatt', totalStock);
    // [['M',2]] 에서 {M:2}로
    if (mode === 'new') {
      //새 상품 만들기
      dispatch(createProduct({ ...formData, stock: totalStock })); // createProduct를 통해서 백엔드로 보내주는 작업
    } else {
      // edit 버튼 누르면 handleSubmit이 호출됨
      // 상품 수정하기
      dispatch(
        editProduct({ ...formData, stock: totalStock, id: selectedProduct._id })
      );
    }
  };

  const handleChange = (event) => {
    //form에 데이터 넣어주기
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value }); // id value이거 머지 register페이지에 있다는데 생각 ㄱㄱ
  };

  // const addStock = () => {
  //   //재고타입 추가시 배열에 새 배열 추가
  //   setStock([...stock, []]);
  // };
  const addStock = (weeks) => {
    // 선택한 주 수에 따라 배열에 새 배열 추가
    const newStock = Array.from({ length: weeks }, () => []);
    setStock(newStock);
  };
  const deleteStock = (idx) => {
    //재고 삭제하기
    const newStock = stock.filter((item, index) => index !== idx); // 클릭한 idx와 같지 않은 애들만 추출
    setStock(newStock);
  };

  const handleSizeChange = (value, index) => {
    //  재고 사이즈 변환하기 // index값에 잇는 value값을 바꿔주면 변환할 수 있을듯
    //[[s,1], [m,2]]
    const newStock = [...stock];
    newStock[index][0] = value; // 이렇게 하면 해당 index 0 은 s를 가리키겠지? 그값을 해당 박스에서 넘겨준 value값으로 바꿔준것
    setStock(newStock);
  };

  const handleStockChange = (value, index) => {
    //재고 수량 변환하기
    const newStock = [...stock];
    newStock[index][0] = value; // 이렇게 하면 해당 index 1 은 1를 가리키겠지? 그값을 해당 박스에서 넘겨준 value값으로 바꿔준것
    setStock(newStock);
  };

  const onHandleCategory = (event) => {
    const selectedValue = event.target.value;

    if (formData.category[0] === selectedValue) {
      // 이미 선택된 상위 카테고리라면 초기화
      setFormData({ ...formData, category: [] });
      setSelectedCategory('');
    } else {
      // 새 상위 카테고리 선택
      setFormData({ ...formData, category: [selectedValue] });
      setSelectedCategory(selectedValue);
    }
  };

  const handleSubCategoryChange = (event) => {
    const selectedSubCategory = event.target.value;
    // 상위 카테고리가 먼저 선택되었을 때만 하위 카테고리를 추가
    setFormData({
      ...formData,
      category: [selectedCategory, selectedSubCategory],
    });
  };

  const handlepushcategoryChange= (e, index) => {
    const newPushCategory = [...formData.pushcategory];
    newPushCategory[index] = e.target.value; // 해당 index에 새 값 저장
    setFormData({
      ...formData,
      pushcategory: newPushCategory,
    });
  };
  const uploadImage = (url) => {
    //이미지 업로드
    setFormData({ ...formData, image: url });
  };
  
  return (
    <Modal show={showDialog} onHide={handleClose}>
      <Modal.Header closeButton>
        {mode === 'new' ? (
          <Modal.Title>스터디 생성하기</Modal.Title>
        ) : (
          <Modal.Title>스터디 수정하기</Modal.Title>
        )}
      </Modal.Header>
      {error && (
        <div className="error-message">
          <Alert variant="danger">{error}</Alert>
        </div>
      )}
      <Form className="form-container" onSubmit={handleSubmit}>
      {page === 1 ? (
    <>
      {/* 첫 번째 페이지: 카테고리, 이름, 설명 등의 입력 폼 */}
      <Form.Group className="mb-3">
        <Form.Label>카테고리를 선택해주세요.</Form.Label>
        <div>
          {MAIN_CATEGORIES.map((category, index) => (
            
            <Button
              key={index}
              value={category}
              className="category-custom-button"
              variant={
                formData.category.includes(category)
                  ? 'secondary'
                  : 'outline-secondary'
              }
              onClick={onHandleCategory}
            >
              {category} 
            </Button>
            
          ))}
        </div>
      </Form.Group>

      {selectedCategory && (
        <Form.Group className="mb-3">
          <Form.Label>서브 카테고리를 선택해주세요.</Form.Label>
          <Form.Select
            value={formData.category[1] || ''}
            onChange={handleSubCategoryChange}
            required
          >
            <option value="" disabled hidden>
              Select a subcategory
            </option>
            {SUB_CATEGORIES[selectedCategory].map((subCategory, index) => (
              <option key={index} value={subCategory}>
                {subCategory}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      )}

      <Row className="mb-3">
        <Form.Group as={Col} controlId="sku">
          <Form.Label>과목명</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="string"
            placeholder="과목명"
            required
            value={formData.sku}
          />
        </Form.Group>
      
        
      </Row>
      <Row className="mb-3">
  {[0, 1, 2].map((index) => (
    <Form.Group as={Col} controlId={`pushcategory-${index}`} key={index}>
      <Form.Label>추가 태그 {index + 1}</Form.Label>
      <Form.Control
        onChange={(e) => handlepushcategoryChange(e, index)}
        type="string"
        placeholder={`추가 태그 ${index + 1}`}
        required
        value={formData.pushcategory[index] || ""}
      />
    </Form.Group>
  ))}
</Row>
      <Row>
      <Form.Group as={Col} controlId="name">
          <Form.Label>글제목</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="string"
            placeholder="제목"
            required
            value={formData.name}
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="description">
        <Form.Label>소제목</Form.Label>
        <Form.Control
          type="string"
          placeholder="내용을 입력하세요.(시간, 장소, 진행방식 등)"
          as="textarea"
          onChange={handleChange}
          rows={3}
          value={formData.description}
          required
        />
      </Form.Group>

      <Button onClick={handleNextPage} variant="secondary" className="custom-button">다음</Button>
    </>
  ) : (
    <>
      {/* 두 번째 페이지: stock 입력 폼 */}
      <Button onClick={handlePreviousPage} variant="secondary" className="custom-button" >이전</Button>
      <Form.Group className="mb-3" controlId="stock">
        <Form.Label className="mr-1">스터디기간</Form.Label>
        {stockError && (
          <span className="error-message">재고를 추가해주세요</span>
        )}
        {/* <Button size="sm" onClick={addStock}>
          Add +
        </Button> */}
        <DropdownButton variant="warning" title="Choose Weeks" onSelect={(eventKey) => addStock(Number(eventKey))}>
        <Dropdown.Item eventKey="2">2 Weeks</Dropdown.Item>
        <Dropdown.Item eventKey="4">4 Weeks</Dropdown.Item>
        <Dropdown.Item eventKey="16">16 Weeks</Dropdown.Item>
      </DropdownButton>
        <div className="mt-2">
          {/* {stock.map((item, index) => (
            <Row key={index}>
              <Col sm={4}>
                <Form.Select
                  onChange={(event) =>
                    handleSizeChange(event.target.value, index)
                  }
                  required
                  defaultValue={item[0] ? item[0].toLowerCase() : ''}
                >
                  <option value="" disabled selected hidden>
                    Please Choose...
                  </option>
                  {SIZE.map((size, idx) => (
                    <option
                      inValid={true}
                      value={size.toLowerCase()}
                      disabled={stock.some(
                        (s) => s[0] === size.toLowerCase()
                      )}
                      key={idx}
                    >
                      {size}
                    </option>
                  ))}
                </Form.Select>
              </Col> */}
              {stock.map((item, index) => (
          <Row key={index} className="mb-2">
            <Col sm={2}>
              <span>{index + 1}주차</span>
            </Col>
            {/* <Col sm={4}>
              <Form.Select
                onChange={(event) =>
                  handleSizeChange(event.target.value, index)
                }
                required
                defaultValue={item[0] ? item[0].toLowerCase() : ''}
              >
                <option value="" disabled selected hidden>
                  Please Choose...
                </option>
                {['S', 'M', 'L', 'XL'].map((size, idx) => (
                  <option
                    value={size.toLowerCase()}
                    disabled={stock.some(
                      (s) => s[0] === size.toLowerCase()
                    )}
                    key={idx}
                  >
                    {size}
                  </option>
                ))}
              </Form.Select>
            </Col> */}
              <Col sm={6}>
                <Form.Control
                  onChange={(event) =>
                    handleStockChange(event.target.value, index)
                  }
                  type="string"
                  placeholder="number of stock"
                  value={item[0]}
                  required
                />
              </Col>
              <Col sm={2}>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteStock(index)}
                >
                  -
                </Button>
              </Col>
            </Row>
          ))}
        </div>
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="Image" required>
          <Form.Label>Image</Form.Label>
          <CloudinaryUploadWidget uploadImage={uploadImage} />

          <img
            id="uploadedimage"
            src={formData.image}
            className="upload-image mt-2"
            alt="uploadedimage"
          ></img>
        </Form.Group> */}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="price">
            <Form.Label>모집인원</Form.Label>
            <Form.Control
              value={formData.price}
              required
              readOnly
              
              type="number"
              placeholder="0"
            />
          </Form.Group>
          <RecruitRadioButton
        limitlessRecruitBoolean={limitlessRecruitBoolean}
        handleRecruitRadio={handleRecruitRadio}
      />
          <RecruitSlider
        price={formData.price}
        setPrice={handlePriceChange}
        limitlessRecruitBoolean={limitlessRecruitBoolean}
      />
      
          {/* <Form.Group as={Col} controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              multiple
              onChange={onHandleCategory}
              value={formData.category}
              required
            >
              {CATEGORY.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Control>
          </Form.Group> */}

          {/* <Form.Group as={Col} controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={formData.status}
              onChange={handleChange}
              required
            >
              {STATUS.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group> */}
        </Row>
        {mode === 'new' ? (
          <Button variant="secondary" className="custom-button-submit-edit" type="submit"  >
            Submit
          </Button>
          
        ) : (
          <Button variant="secondary" className="custom-button-submit-edit" type="submit">
            Edit
          </Button>
        )}
      </>
  )}
      </Form>
      
    </Modal>
  );
};

export default NewItemDialog;
