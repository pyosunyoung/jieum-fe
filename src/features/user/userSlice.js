import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { showToastMessage } from "../common/uiSlice";
import api from "../../utils/api";
import { initialCart } from "../cart/cartSlice";

export const loginWithEmail = createAsyncThunk(
  "user/loginWithEmail",
  async ({ email, password }, { rejectWithValue }) => {
    try{
      const response = await api.post("/auth/login", {email, password}) // post로 보내줌
      //성공
      //Loginpage에서 처리
      // 토큰저장
      //1. local storage(페이지 닫혔다 켜져도 다시 유지) 
      //2. session storage (새로고침하면 유지, 페이지 닫히면 유지x)
      sessionStorage.setItem("token", response.data.token);
      return response.data; // response.data.user이렇게 해도 됨
    }catch(error){
    //실패
    //실패시 생긴 에러값을 reducer에 저장
    return rejectWithValue(error.error)
    }

  }
);

export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (token, { rejectWithValue }) => {}
);

export const logout = () => (dispatch) => {
  // user정보를 지우고
  dispatch(userLoggedOut());
  // session token의 값을 지운다.
  sessionStorage.removeItem("token")
};
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (
    { email, name, password, navigate, DeterminationWord, PhoneNumber, department,studentNumber,InterestTag },
    { dispatch, rejectWithValue }
  ) => {
    try{
      const response = await api.post("/user", {email,name,password, DeterminationWord, PhoneNumber, department,studentNumber,InterestTag})
      //성공
      //1. 성공 토스트 메세지 보여주기
      dispatch(showToastMessage({message:"회원가입을 성공했습니다!", status:"success"}))
      //2. 로그인 페이지로 리다이렉트
      navigate('/login');
      
      return response.data.data;
    }catch(error){
      //실패
      //1. 실패 토스트 메세지를 보여준다.
      dispatch(showToastMessage({message:"회원가입에 실패했습니다.", status:"error"}))
      // 2. 에러값을 저장한다.
      return rejectWithValue(error.error) // 백엔드에서 error넘겨줘서 가능
    }

  }
);

export const loginWithToken = createAsyncThunk(
  "user/loginWithToken",
  async (_, { rejectWithValue }) => { // _는 주는 정보 없음
  // 토큰은 login했을 때 저장됨 그 로직 짜러 가야함 login with email ㄱㄱ
    try{ // 다시 뭐 get TKoen을 할필요가 없음 우리는 이미 api.js에서 headrs에 token을 설정시켜놨기 떄문 그래서 이 토큰이 누구의 토큰인지만 요청해주면 됨
      const response = await api.get("/user/me")
      return response.data
    } catch(error){
      return rejectWithValue(error.error)
    }
  }
);

export const updateLikeOnPost = createAsyncThunk(
  'user/updateLikeOnPost',
  async ({ userId, postId, isLiked }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/user/like', { userId, postId, isLiked });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateChecklist = createAsyncThunk(
  "user/updateChecklist",
  async ({ productId, weekIndex }, { getState }) => {
    const state = getState();

    const productCompleted = state.user.completed[productId] || [];
    const updatedCompleted = [...productCompleted];
    updatedCompleted[weekIndex] = true;

    return { productId, updatedCompleted };
  }
);
// export const updateTemperature = createAsyncThunk(
//   "user/updateTemperature",
//   async (temperature, { getState, rejectWithValue }) => {
//     try {
//       const state = getState();
//       const { user } = state.user;
//       if (!user) throw new Error("User not found");

//       // API 호출로 서버에 temperature 값 업데이트
//       const response = await api.post("/user/temperature", { temperature });
//       return response.data; // 서버에서 갱신된 값 반환
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Failed to update temperature");
//     }
//   }
// );
export const getTemperature = createAsyncThunk(
  "user/getTemperature",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { user } = state.user;
      if (!user) throw new Error("User not found");

      // API 호출로 서버에서 temperature 값 가져오기
      const response = await api.get("/user/me");
      return response.data.user.temperature + 1; // 서버에서 사용자 데이터의 temperature 반환
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch temperature");
    }
  }
);

// export const increaseTemperature = createAsyncThunk(
//   'user/increaseTemperature',
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const state = getState();
//       const { user } = state.user;
//       if (!user) throw new Error("User not found");

//       // 온도 증가 요청
//       const response = await api.post('/user/increase-temperature'); // 서버에서 온도 증가 처리
//       return response.data.user.temperature + 1; // 서버에서 반환된 데이터 (updated temperature)
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Failed to increase temperature");
//     }
//   }
// );
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    loginError: null,
    likedPosts: [],
    completed: {}, // 각 주차의 체크 상태
    registrationError: null,
    success: false,
    temperature: Number(localStorage.getItem("temperature")) || 0, // 온도만 별도로 관리
    admintemperature: Number(localStorage.getItem("admintemperature")) || 27, // 온도만 별도로 관리
    totaltemperature: Number(localStorage.getItem("totaltemperature") || 27),
    kimTemperature: Number(localStorage.getItem("kimTemperature")) || 27,
    pyoTemperature: Number(localStorage.getItem("pyoTemperature")) || 27,
    jungTemperature: Number(localStorage.getItem("jungTemperature")) || 27,
    koTemperature: Number(localStorage.getItem("koTemperature")) || 27,
    parkTemperature: Number(localStorage.getItem("parkTemperature")) || 27,
    // temperature: 26, // 추가: 초기값 설정
  },
  reducers: { // 직접적으로 호출
    setUser: (state, action) => {
      state.user = action.payload; // user 정보 업데이트
    },
    clearErrors: (state) => {
      state.loginError = null;
      state.registrationError = null;
    },
     // 로그아웃 처리: 상태 초기화
    userLoggedOut: (state) => {
      state.user = null;
      state.loading = false;
      state.loginError = null;
      state.registrationError = null;
      state.success = false;
    },
     // 좋아요 토글 처리
    toggleLikePost: (state, action) => {
      const postId = action.payload;
      const likedPosts = state.user?.likedPosts || [];
      if (likedPosts.includes(postId)) {
        // 좋아요 제거
        state.user.likedPosts = likedPosts.filter((id) => id !== postId);
      } else {
        // 좋아요 추가
        state.user.likedPosts = [...likedPosts, postId];
      }
    },
    increaseTemperature: (state) => {
      state.temperature += 1;
      localStorage.setItem("temperature", state.temperature); // 온도값을 localStorage에 저장
      localStorage.setItem("admintemperature", state.admintemperature); // 온도값을 localStorage에 저장
    },
    adminIncreaseTemperature: (state) => {
      state.admintemperature += 1;
      localStorage.setItem("admintemperature", state.admintemperature); // 온도값을 localStorage에 저장
    },
    updateTemperature: (state, action) => {
      state.temperature = action.payload;
      localStorage.setItem("temperature", action.payload); // 서버에서 온도값 업데이트 후 localStorage에 저장
      localStorage.setItem("admintemperature", state.admintemperature); // 온도값을 localStorage에 저장
    },
    increaseTotalTemperature: (state, action) => {
      state.totaltemperature = action.payload;
    },
    TotalTemperature: (state, action) => {
      state.totaltemperature = action.payload;
    },
    evaluateMemberTemperature: (state, action) => {
      const { memberKey, score } = action.payload;
      // 기존 온도를 로컬스토리지에서 가져오고 업데이트
      const updatedTemperature = state[memberKey] + score;
      state[memberKey] = updatedTemperature;
      localStorage.setItem(memberKey, updatedTemperature);  // 로컬스토리지에 저장
    },

  },
  extraReducers: (builder) => { // async처럼 외부의 함수를 통해 호출
    builder.addCase(registerUser.pending, (state)=> { // 데이터 기다림, state는 initialState를 넘겨줌
      state.loading = true; // 로딩스피너
    })
    .addCase(registerUser.fulfilled, (state)=> {
      state.loading = false;
      state.registrationError = null;
    }) // 성공
    .addCase(registerUser.rejected, (state, action)=> {
      state.registrationError = action.payload;
    }) // 실패
    .addCase(loginWithEmail.pending, (state) => {
      state.loading = true;
    })
    .addCase(loginWithEmail.fulfilled, (state, action)=> {
      state.loading = false;
      state.user = action.payload.user// 로그인이 성공적이라면 이 user값을 init initialState: { user: null, 여기에 넣어주겠다
      state.loginError=null // 로그인 에러는 null로 바꿔주고
    })
    .addCase(loginWithEmail.rejected, (state, action)=>{
      state.loading = false;
      state.loginError= action.payload
    })
    // .addCase(loginWithToken.pending, (state,action)=>{
    //   //로딩스피너 보여줄 필요 없음 그냥 유저 체크하는 것임
    // })
    .addCase(loginWithToken.fulfilled, (state,action)=>{
      state.user = action.payload.user // 유저값 찾았으면 그냥 토큰 세팅만 해주면 됨
    })
    // .addCase(loginWithToken.rejected, (state,action)=>{
    //   //유저값을 찾는건 이미 뒤에서 진행되는 것이니 유저값을 못찾으면 
    //다시 그냥 유저가 로그인 페이지를 다시 로그인할 수 있게 해주면 됨 필요x
    .addCase(updateChecklist.fulfilled, (state, action) => {
      const { productId, updatedCompleted } = action.payload;
      state.completed[productId] = updatedCompleted;
    })
    // .addCase(updateTemperature.fulfilled, (state, action) => {
    //   // 서버에서 반환된 temperature 값으로 상태 업데이트
    //   state.user.temperature = action.payload.temperature;
    //   localStorage.setItem("temperature", action.payload.temperature); // 서버에서 반환된 값을 저장
    // })
    // .addCase(updateTemperature.rejected, (state, action) => {
    //   console.error("Failed to update temperature:", action.payload);
    // })
    // .addCase(getTemperature.fulfilled, (state, action) => {
    //   // 서버에서 반환된 temperature 값으로 상태 초기화
    //   state.user.temperature = action.payload;
    // })
    // .addCase(getTemperature.rejected, (state, action) => {
    //   console.error("Failed to fetch temperature:", action.payload);
    // });
  },
});
export const { clearErrors, userLoggedOut,toggleLikePost,increaseTemperature, updateTemperature,adminIncreaseTemperature,increaseTotalTemperature,evaluateMemberTemperature} = userSlice.actions;
export default userSlice.reducer;
