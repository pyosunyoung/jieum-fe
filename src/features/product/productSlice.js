import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";

// 비동기 액션 생성
export const getProductList = createAsyncThunk(
  "products/getProductList",
  async (query, { rejectWithValue }) => {
    try{
      const response = await api.get("/product", {params:{...query}}); // params가져와서 백엔드에 보냄
      if(response.status!==200) throw new Error(response.error);
      // console.log("rrr", response);
      return response.data; // pagnum으로 인한 data로 변경
    }catch(error){
      rejectWithValue(error.error);
    }
  }
);

export const getProductDetail = createAsyncThunk(
  "products/getProductDetail",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await api.get(`/product/${id}`); // 상품 상세 정보 요청
      if (response.status !== 200) throw new Error(response.error);

      // 요청 성공 시 데이터 반환
      return response.data.data;
    } catch (error) {
      // 실패 시 에러 메시지 표시
      dispatch(showToastMessage({ message: error.message || "게시글 정보를 불러오지 못했습니다.", status: "error" }));
      return rejectWithValue(error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData, { dispatch, rejectWithValue }) => {
    try{
      const response = await api.post("/product",formData)
      if(response.status!==200) throw new Error(response.error)
      dispatch(showToastMessage({message:"게시글 생성 완료", status:"success"}))
      dispatch(getProductList({page:1}))
        return response.data.data
    }catch(error){
      return rejectWithValue(error.error)
    }

  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      
      const response = await api.delete(`/product/${id}`);
      if (response.status !== 200) throw new Error(response.error);
      dispatch(showToastMessage({ message: "게시글 삭제 완료", status: "success" }));
  
      dispatch(getProductList({ page: 1 }));
      return id; // 삭제된 상품 ID 반환
    } catch (error) {
      dispatch(showToastMessage({ message: error.message || "삭제 실패", status: "error" }));
      return rejectWithValue(error.message);
    }

  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, ...formData }, { dispatch, rejectWithValue }) => {
    try{
      const response = await api.put(`/product/${id}`, formData) // id값과 수정 formdata를 백엔드로
      if(response.status!==200) throw new Error(response.error)
      dispatch(getProductList({page:1})) // 수정된 데이터 바로바로 업데이트 작업, page는 1페이지 부터 보이게 설정
        return response.data.data
    }catch(error){
      return rejectWithValue(error.error);
    }

  } // 수정하고 싶은 id값을 가져옴
);
export const toggleLikeOnProduct = createAsyncThunk(
  "products/toggleLikeOnProduct",
  async ({ productId, increment }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/product/${productId}/like`, { increment });
      if (response.status !== 200) throw new Error(response.error);
      return { productId, increment };
    } catch (error) {
      return rejectWithValue(error.message || "좋아요 토글 실패");
    }
  }
);

export const fetchPosts = createAsyncThunk("product/fetchPosts", async () => {
  const response = await api.get("/api/posts");
  return response.data.data; // 서버에서 반환하는 데이터 구조에 따라 수정
});

// 슬라이스 생성
const productSlice = createSlice({
  name: "products",
  initialState: {
    productList: [],
    selectedProduct: null,
    loading: false,
    error: "",
    totalPageNum: 1,
    success: false,
    posts: [],
    likes: JSON.parse(localStorage.getItem("likesData")) || 0, // userId 기반으로 좋아요 상태 저장
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setFilteredList: (state, action) => {
      state.filteredList = action.payload;
    },
    clearError: (state) => {
      state.error = "";
      state.success = false;
    },
    toggleLikeOnPost: (state, action) => {
      const { postId, increment } = action.payload;
      const product = state.productList.find((item) => item._id === postId);
      if (product) {
        product.likes = Math.max(0, product.likes + (increment ? 1 : -1));
      }
    },
    toggleLike: (state, action) => {
      const { userId, productId } = action.payload;

      // 사용자의 좋아요 상태 초기화
      if (!state.likes[userId]) {
        state.likes[userId] = {};
      }

      const isLiked = state.likes[userId][productId];

      // 좋아요 토글
      if (isLiked) {
        delete state.likes[userId][productId];
        const product = state.productList.find((item) => item._id === productId);
        if (product) product.likes = Math.max(0, product.likes - 1);
      } else {
        state.likes[userId][productId] = true;
        const product = state.productList.find((item) => item._id === productId);
        if (product) product.likes += 1;
      }
    },
  
  },
  extraReducers: (builder) => {
    builder
    .addCase(createProduct.pending,(state,action)=>{
      state.loading=true
    })
    .addCase(createProduct.fulfilled,(state,action)=>{
      state.loading = false
      state.error = ""
      state.success=true // 이거의 역할 상품 생성을 성공했다? 다이얼로그를 닫고, 실패시 실패메세지를 다이어로그에 보여주고, 닫지 않음
    })
    .addCase(createProduct.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
      state.success = false
    })
    .addCase(getProductList.pending, (state,action)=>{
      state.loading=true
    })
    .addCase(getProductList.fulfilled, (state,action)=>{
      state.loading=false
      state.productList = action.payload.data; // pagnum으로 인한 data로 변경
      state.error = ""
      state.totalPageNum=action.payload.totalPageNum; // totalpagenum 저장
    })
    .addCase(getProductList.rejected, (state,action)=>{
      state.loading=false;
      state.error=action.payload;
      
    })
    .addCase(editProduct.pending, (state,action) => {
      state.loading = true
    })
    .addCase(editProduct.fulfilled, (state,action) => {
      state.loading = false
      state.error=""
      state.success = true // 팝업창 닫는 로직
    })
    .addCase(editProduct.rejected, (state,action) => {
      state.loading=false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      // 삭제된 상품 ID를 사용해 productList 업데이트
      state.productList = state.productList.filter(
        (product) => product.id !== action.payload
      );
    })
    .addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getProductDetail.pending, (state) => {
      state.loading = true; // 로딩 시작
    })
    .addCase(getProductDetail.fulfilled, (state, action) => {
      state.loading = false; // 로딩 완료
      state.error = ""; // 에러 초기화
      state.selectedProduct = action.payload; // 상품 정보 저장
    })
    .addCase(getProductDetail.rejected, (state, action) => {
      state.loading = false; // 로딩 종료
      state.error = action.payload; // 에러 저장
    })
    .addCase(toggleLikeOnProduct.fulfilled, (state, action) => {
      const { productId, likes } = action.payload;
      const product = state.productList.find((item) => item._id === productId);
      if (product) {
        product.likes = likes; // 서버에서 받은 좋아요 수를 업데이트
      }
    })
    .addCase(fetchPosts.fulfilled, (state, action) => {
      state.productList = action.payload;
    })
  },
});

export const { setSelectedProduct, setFilteredList, clearError,toggleLikeOnPost,toggleLike } =
  productSlice.actions;
export default productSlice.reducer;
