import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { showToastMessage } from '../common/uiSlice';
import { createOrder, getOrder } from '../order/orderSlice';

const initialState = {
  loading: false,
  error: '',
  cartList: [],
  selectedItem: {},
  cartItemCount: 0,
  totalPrice: 0,
};

// Async thunk actions
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ id, size }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post('/cart', { productId: id, size, qty: 1 }); // 백엔드 확인 ㄱㄱ qty몇개 살지 // 이걸 약간 스터디 신청 고객 정보로 바꾸면 될듯?
      if (response.status !== 200) throw new Error(response.error);
      dispatch(
        showToastMessage({
          message: '스터디 신청이 완료되었습니다.',
          status: 'success',
        })
      );
      return response.data.cartItemQty; // TODO 백엔드 만들고 다시 수정
    } catch (error) {
      dispatch(
        showToastMessage({
          message: '스터디 신청에 실패하였습니다.',
          status: 'error',
        })
      );
      return rejectWithValue(error.error);
    }
  }
);

export const getCartList = createAsyncThunk(
  'cart/getCartList',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get('/cart');
      if (response.status !== 200) throw new Error(response.error);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async (id, { rejectWithValue, dispatch }) => {
    try{
      const response = await api.delete(`/cart/${id}`);
      if (response.status !== 200) throw new Error(response.error);
      // 삭제 후 최신 장바구니 리스트를 다시 가져옵니다.
      const updatedCartList = await dispatch(getCartList()).unwrap();
      return updatedCartList; // payload로 반환
    }catch(error){
      showToastMessage(error, "error");
    }
    
  }
);

export const updateQty = createAsyncThunk(
  'cart/updateQty',
  async ({ id, value }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.put(`/cart/${id}`, { qty: value });
      if (response.status !== 200) throw new Error(response.error);


      return response.data.data; // 업데이트된 장바구니 리스트 반환
    } catch (error) {
      dispatch(showToastMessage(error, "error"));
      return rejectWithValue(error.message);
    }
  }
);

export const getCartQty = createAsyncThunk(
  'cart/getCartQty',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get('/cart/qty');
      if (response.status !== 200) throw new Error(response.error);

      return response.data.qty; // 장바구니의 총 수량 반환
    } catch (error) {
      dispatch(
        showToastMessage({
          // message: '장바구니 수량을 가져오는 데 실패했습니다.',
          status: 'error',
        })
      );
      return rejectWithValue(error.message);
    }
  }
);

export const addToCartAndCreateOrder = createAsyncThunk(
  'cart/addToCartAndCreateOrder',
  async ({ id, size }, { dispatch, rejectWithValue }) => {
    try {
      // 1. 장바구니에 아이템 추가
      const cartQty = await dispatch(addToCart({ id, size })).unwrap();

      // 2. 주문 생성
      const orderPayload = { productId: id, size, qty: 1 }; // 필요한 주문 정보 설정
      const orderNum = await dispatch(createOrder(orderPayload)).unwrap();

      // 3. 방금 생성한 주문 정보를 가져와 selectedOrder에 저장
      const orderData = await dispatch(getOrder()).unwrap(); // 주문 정보를 가져오는 Thunk 호출

      // 4. 성공 메시지 표시
      dispatch(showToastMessage({ message: '스터디 신청이 완료되었습니다.', status: 'success' }));

      return { cartQty, orderNum, orderData };
    } catch (error) {
      // 에러 발생 시 메시지 표시
      dispatch(showToastMessage({ message: '스터디 신청에 실패하였습니다.', status: 'error' }));
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initialCart: (state) => {
      state.cartItemCount = 0;
    },
    // You can still add reducers here for non-async actions if necessary
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      state.cartItemCount = action.payload;
      //TODO 백엔드 하고 정하자
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getCartList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCartList.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      state.cartList = action.payload;
      state.totalPrice = action.payload.reduce(
        (total, item) => total + item.productId.price * item.qty,
        0
      ); // 카트 토탈값 계산, 여러곳에서 쓰여서 리듀서에 넣어줌// 카트리스트에 값이 들어오면 바로바로 계산 되어지게 설정
    });
    builder.addCase(getCartList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteCartItem.pending, (state,action)=> {
      state.loading = true; // 삭제 요청 중
    })
    builder.addCase(deleteCartItem.fulfilled, (state,action)=> {
      state.loading = false; // 삭제 완료
        state.error = '';
        state.cartList = action.payload; // 최신화된 장바구니 리스트 반영
        state.totalPrice = action.payload.reduce(
          (total, item) => total + item.productId.price * item.qty,
          0
        ); // 총 가격 계산

    })
    builder.addCase(deleteCartItem.rejected, (state,action)=> {
      state.loading = false; // 요청 실패
      state.error = action.payload; // 에러 메시지 저장
    })
    builder.addCase(updateQty.pending, (state,action) => {
      state.loading = true; // 요청 중
    })
    builder.addCase(updateQty.fulfilled, (state,action) => {
      state.loading = false; // 요청 성공
      state.error = '';
      state.cartList = action.payload; // 업데이트된 장바구니 리스트 반영
      state.totalPrice = action.payload.reduce(
        (total, item) => total + item.productId.price * item.qty,
        0
      ); // 총 가격 재계산
    })
    builder.addCase(updateQty.rejected, (state,action) => {
      state.loading = false; // 요청 실패
        state.error = action.payload; // 에러 메시지 저장
    })
    builder.addCase(getCartQty.pending, (state, action)=> {
      state.loading = true; // 로딩 상태 설정
    })
    builder.addCase(getCartQty.fulfilled, (state, action)=> {
      state.loading = false; // 로딩 완료
      state.error = ''; // 에러 초기화
      state.cartItemCount = action.payload; // 총 수량 업데이트
    })
    builder.addCase(getCartQty.rejected, (state, action)=> {
      state.loading = false; // 로딩 중단
      state.error = action.payload; // 에러 메시지 저장
    })
    .addCase(addToCartAndCreateOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      state.selectedOrder = action.payload.orderData; // 주문 데이터 업데이트
    })
    .addCase(addToCartAndCreateOrder.pending, (state) => {
      state.loading = true;
    })
    .addCase(addToCartAndCreateOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});


export default cartSlice.reducer;
export const { initialCart } = cartSlice.actions;
