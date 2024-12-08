import React from 'react';
import StudyItem from './StudyItem';
import './StudyList.css';
import RecruitState from './RecruitState';

const StudyList = ({ studies, handleCompleteRecruit,selectedOrder }) => {
  console.log("selectedOrder", selectedOrder)
  return (
    <div className="study-list">
      {selectedOrder.map((order) => (
        <div key={order._id} className="study-item-wrapper">
          <StudyItem 
            studies={studies}
            productName={order.items[0].productId.name || "No Product Name"} 
            createdAt={order.createdAt} 
            productId={order.items[0].productId._id}
            orderStatus={order.status} 
          />
          {/* <RecruitState
            studies={studies}
            handleCompleteRecruit={handleCompleteRecruit}
            selectedOrder={selectedOrder}
          /> */}
        </div>
      ))}
    </div>
  );
};

export default StudyList;
