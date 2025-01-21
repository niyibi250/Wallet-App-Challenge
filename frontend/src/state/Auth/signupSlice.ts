import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showSuccessToast, showErrorToast } from '../../utils/ToastConfig';

interface SignUpState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
}

interface SignupResponse {
    message: string,
    token: string;
    user: {
      id: number;
      email: string;
      fistName:string;
      lastName:string;
    };
}

const initialState: SignUpState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  loading: false,
  error: null,
};

interface Credentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
  // const url = 'http://localhost:3000/api'
  const url = 'https://wallet-app-challenge-backend.onrender.com/api'

export const registerUser = createAsyncThunk<SignupResponse, Credentials>(
  'signUp/registerUser',
  async (credentials: Credentials, thunkAPI) => {
    try {
      const response = await axios.post(`${url}/users/register`, credentials);
      showSuccessToast(`${response.data.message}`);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'An error occurred';
      showErrorToast(errorMessage);
      return thunkAPI.rejectWithValue({ message: errorMessage });
    }
  }
);


const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<SignupResponse>) => {
      const newToken = action.payload.token ? action.payload.token : null;
      const user = action.payload.user;
      localStorage.setItem('token', newToken!);
      localStorage.setItem('user', JSON.stringify(user));
      return {
        ...state,
        loading: false,
        token: newToken,
        user: user,
        message: 'Registed Successfully',
      };;
    })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});


export default signUpSlice.reducer;
