import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { showErrorToast, showSuccessToast } from '../../utils/ToastConfig';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }
interface SignInState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

interface LoginResponse {
    message: string,
    token: string;
    user: {
      id: number;
      email: string;
      firstName:string;
      lastName:string;
    };
  }

  interface DecodedToken {
    user: User;
  }
  interface Credentials {
    email: string;
    password: string;
  }

const tokenFromStorage = localStorage.getItem('token');

  export const initialState: SignInState = {
    token: tokenFromStorage,
    user: tokenFromStorage ? jwtDecode<DecodedToken>(tokenFromStorage).user : null,
    loading: false,
    error: null,
    message: null,
  };

  // const url = 'http://localhost:3000/api'
  const url = 'https://wallet-app-challenge-backend.onrender.com/api'
export const loginUser = createAsyncThunk<LoginResponse, Credentials>(
  'signIn/loginUser',
  async (credentials: Credentials, thunkAPI) => {
    return axios.post(`${url}/users/login`, credentials)
      .then((response) => {
        showSuccessToast(`${response.data.message}`);
        return response.data;
      })
      .catch((error) => {
        showErrorToast(error.response?.data?.message || error.message || 'An error occurred');
        return thunkAPI.rejectWithValue({
          message: error.response?.data?.message || error.message || 'An error occurred',
        });
      });
  }
);

const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        token: null,
        user: null,
        message: 'Logout Successfully',
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    });
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
      const newToken = action.payload.token ? action.payload.token : null;
      const user = action.payload.user;
      localStorage.setItem('token', newToken!);
      localStorage.setItem('user', JSON.stringify(user));
    
      return {
        ...state,
        loading: false,
        token: newToken,
        user: user,
        message: 'Login Successfully',
      };
    });
    
    builder.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
      return {
        ...state,
        loading: false,
        error: action.payload.message || 'Something went wrong',
        message: null,
      };
    });
  },
});


export const { logout } = signInSlice.actions;

export default signInSlice.reducer;