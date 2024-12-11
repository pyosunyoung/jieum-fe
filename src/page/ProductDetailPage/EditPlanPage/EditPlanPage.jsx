import React, {useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import "../EditPlanPage/EditPlanPage.css";
import {useDispatch, useSelector} from "react-redux";
import {editProduct} from "../../../features/product/productSlice";

const EditPlanPage = () => {
  const dispatch = useDispatch();
  const {selectedProduct} = useSelector((state) => state.product);
  const {stock} = selectedProduct; // stock 데이터
  const {id} = useParams();
  const navigate = useNavigate();

  // 배열 기반으로 stock 데이터 변환
  const stockArray = Object.entries(stock);
  const currentIndex = parseInt(id, 10) - 1; // id를 기준으로 배열 인덱스 설정
  const [planKey, setPlanKey] = useState(stockArray[currentIndex][0]);
  const [planValue, setPlanValue] = useState(stockArray[currentIndex][1]);
  const [task, setTask] = useState("");

  // Key 변경 핸들러
  const handlePlanKeyChange = (e) => {
    setPlanKey(e.target.value);
  };

  // Value 변경 핸들러
  const handlePlanValueChange = (e) => {
    setPlanValue(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // stock 데이터 배열 업데이트
    const updatedStockArray = [...stockArray];
    updatedStockArray[currentIndex] = [planKey, planValue];

    // 배열을 객체로 변환
    const updatedStock = Object.fromEntries(updatedStockArray);

    // Redux 상태 업데이트
    dispatch(
      editProduct({
        id: selectedProduct._id, // 상품 ID
        ...selectedProduct, // 기존 데이터 포함
        stock: updatedStock, // 수정된 stock 데이터 반영
      })
    );

    alert("등록되었습니다.");
    // 새로고침 없이 반영된 상태를 확인하도록 navigate 사용
    navigate(`/product/${selectedProduct._id}/manage-study/StudyAdminPage`, {
      replace: true,
    });
  };

  return (
    <div className="edit-page-page">
      <div className="edit-plan-page">
        <h2>{selectedProduct.sku}</h2>
        <h3>{`${id}주차`}</h3>
        <div className="key-section">
          <label htmlFor="plan-key"></label>
          <input
            id="plan-key"
            type="text"
            placeholder="Key를 입력하세요"
            value={planKey}
            onChange={handlePlanKeyChange}
          />
        </div>
        <textarea
          placeholder="구체적인 계획을 작성해주세요."
          value={planValue}
          onChange={handlePlanValueChange}
        />
        <div className="task-section">
          <label htmlFor="task">과제:</label>
          <input
            id="task"
            type="text"
            placeholder="텍스트를 작성해주세요"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <button className="submit-btn" onClick={handleSubmit}>
          등록
        </button>
      </div>
    </div>
  );
};

export default EditPlanPage;
