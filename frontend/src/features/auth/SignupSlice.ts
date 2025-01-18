import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showSuccessToast, showErrorToast } from '../../utils/ToastConfig';

interface SignUpState {
  name: string;
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
}

const initialState: SignUpState = {
  name: '',
  email: '',
  password: '',
  loading: false,
  error: null,
};
// const apiUrl = `${import.meta.env.VITE_BASE_URL}/user/register`;
const apiUrl = 'http://localhost:3000/api/users/register';

export const registerUser = createAsyncThunk(
  'signUp/registerUser',
  async (userData: Omit<SignUpState, 'loading' | 'error'>) => {
    const response = await axios.post('localhost:3000/api/users/register', userData);
    return response.data;
  }
);

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setname: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        showSuccessToast(
          'Registration successful! Please check your Email to confirm.'
        );
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
        showErrorToast(state.error);
      });
  },
});

export const { setname, setEmail, setPassword } =
  signUpSlice.actions;

export default signUpSlice.reducer;
