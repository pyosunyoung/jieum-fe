import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartQty } from "../cart/cartSlice";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";

// Define initial state
const initialState = {
  orderList: [],
  orderNum: "",
  selectedOrder: [],
  error: "",
  loading: false,
  totalPageNum: 1,
};

// Async thunks
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (payload, { dispatch, rejectWithValue }) => {
    try{
      const response = await api.post("/order", payload); // 이렇게 하면 post는 body로 보낸 값들을 ordercontroller로 전달해 줌
      if(response.status!==200) throw new Error(response.error)
        dispatch(getCartQty())
        return response.data.orderNum
    }catch(error){
      dispatch(showToastMessage({message:error.error, status:"error"}))
      return rejectWithValue(error.error)
    }
  }
);

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get("/order/me");
      console.log("API response:", response.data); 
      if (response.status !== 200) throw new Error(response.error);
      return response.data.data;
    } catch (error) {
      dispatch(showToastMessage({ message: error.message, status: "error" }));
      return rejectWithValue(error.message);
    }
  }
);

export const getOrderList = createAsyncThunk(
  "order/getOrderList",
  async (query, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get("/order", {
        params: { ...query },
      });
      if (response.status !== 200) throw new Error(response.error);
      return response.data;
    } catch (error) {
      dispatch(showToastMessage({ message: error.message, status: "error" }));
      return rejectWithValue(error.message);
    }
  }
);

// updateOrder 비동기 Thunk 생성
export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ id, status }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`/order/${id}`, { status });
      if (response.status !== 200) throw new Error(response.error);

      dispatch(showToastMessage({ message: "오더 업데이트 완료!", status: "success" }));
      dispatch(getOrderList());
      return response.data;
    } catch (error) {
      dispatch(showToastMessage({ message: error.message, status: "error" }));
      return rejectWithValue(error.message);
    }
  }
);

// Order slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedOrder: (state, action) => {
      
      state.selectedOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state,action)=>{
      state.loading=true
    })
    .addCase(createOrder.fulfilled, (state, action)=> {
      state.loading=false
      state.error=""
      state.orderNum = action.payload
    })
    .addCase(createOrder.rejected, (state, action)=> {
      state.loading=false;
      state.error = action.payload;
    })
    // getOrder
    .addCase(getOrder.pending, (state) => {
      state.loading = true;
    })
    .addCase(getOrder.fulfilled, (state, action) => {
      console.log("Fulfilled action payload:", action.payload); 
      state.loading = false;
      state.error = "";
      state.selectedOrder = action.payload;
    })
    .addCase(getOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // getOrderList 상태 처리
    .addCase(getOrderList.pending, (state) => {
      state.loading = true;
    })
    .addCase(getOrderList.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.orderList = action.payload.data;
      state.totalPageNum = action.payload.totalPageNum;
    })
    .addCase(getOrderList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // updateOrder 상태 처리
    .addCase(updateOrder.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      // 추가적인 상태 업데이트 로직이 필요할 수 있음
    })
    .addCase(updateOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;
