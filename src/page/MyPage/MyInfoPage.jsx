import React from 'react';
import MyPage from './MyPage';

const MyInfoPage = ({user, selectedOrder}) => {
  return (
    <div className="my-info-page">
      <MyPage user={user} selectedOrder={selectedOrder}/>
    </div>
  );
};

export default MyInfoPage;
