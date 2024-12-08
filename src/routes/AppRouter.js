import React from "react";
import { Route, Routes } from "react-router";
import AdminOrderPage from "../page/AdminOrderPage/AdminOrderPage";
import AdminProduct from "../page/AdminProductPage/AdminProductPage";
import CartPage from "../page/CartPage/CartPage";
import Login from "../page/LoginPage/LoginPage";
import MyPage1 from "../page/MyPage/MyPage1";
import OrderCompletePage from "../page/OrderCompletePage/OrderCompletePage";
import PaymentPage from "../page/PaymentPage/PaymentPage";
import ProductAll from "../page/LandingPage/AllStudiesPage";
import ProductDetail from "../page/ProductDetailPage/ProductDetailPage";
import RegisterPage from "../page/RegisterPage/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import ChecklistPage from "../page/ProductDetailPage/ChecklistPage/ChecklistPage"
import StudyAdminPage from "../page/ProductDetailPage/StudyAdminPage/StudyAdminPage"
import EditPlanPage from "../page/ProductDetailPage/EditPlanPage/EditPlanPage"
import Homepage from '../page/Homepage/Homepage';
import WeekTodoPage from '../page/ProductDetailPage/WeekTodoPage/WeekTodoPage';
import MyDetailPage from '../page/MyPage/MyDetailPage/MyDetailPage';
import AcceptMemberPage from '../page/AcceptMemberPage/AcceptMemberPage';
import LikedPostsPage from '../page/LandingPage/components/LikedPostsPage';

const AppRouter = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Homepage />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/product/:id/manage-study" element={<ChecklistPage/>} />
      <Route path="/product/:id/manage-study/StudyAdminPage" element={<StudyAdminPage/>} />
      <Route path="/product/:id/StudyTeammatePage/:id" element={<WeekTodoPage/>} />
      <Route path="/product/:id/manage-study/StudyAdminPage/EditPlanPage/:id" element={<EditPlanPage/>} />
      
      <Route element={<PrivateRoute permissionLevel="customer" />}>
      <Route path="/studies" element={<ProductAll />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment/success" element={<OrderCompletePage />} />
        <Route path="/account/purchase" element={<MyPage1 />} />
        <Route path="/myinfo/details" element={<MyDetailPage />} />
        <Route path="/like" element={<LikedPostsPage/>} />
      </Route>
      <Route element={<PrivateRoute permissionLevel="admin" />}>
        <Route path="/admin/product" element={<AdminProduct />} />
        <Route path="/admin/order" element={<AdminOrderPage />} />
        <Route path="/admin/order/2" element={<AcceptMemberPage/>} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
