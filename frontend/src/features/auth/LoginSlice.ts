import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { showErrorToast, showSuccessToast } from '../../utils/ToastConfig';

interface User {
  id: number;
  name: string;
  email: string;
}

interface SignInState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface DecodedToken {
  user: User;
}

interface LoginResponse {
  token: string;
  message: string;
  user: {
    id: number;
    email: string;
  };
}

interface Credentials {
  email: string;
  password: string;
}

interface Arguments {
  id: string | undefined;
  codes: number;
}
const tokenFromStorage = localStorage.getItem('token');

let userFromToken: User | null = null;

if (tokenFromStorage) {
  try {
    const decodedToken = jwtDecode<DecodedToken>(tokenFromStorage);
    userFromToken = {
      id: decodedToken.user.id,
      name: decodedToken.user.name,
      email: decodedToken.user.email,
    };
  } catch (error) {
    localStorage.removeItem('token');
  }
}

export const initialState: SignInState = {
  token: tokenFromStorage,
  user: userFromToken,
  loading: false,
  error: null,
};

// const apiUrl = `${import.meta.env.VITE_BASE_URL}/user/login`;
const apiUrl = `${import.meta.env.VITE_BASE_URL}/user/login`;
export const loginUser = createAsyncThunk<LoginResponse, Credentials>(
  'signIn/loginUser',
  async (credentials: Credentials, thunkAPI) => {
    return axios
      .post(apiUrl, credentials)
      .then((response) => {
        showSuccessToast(response.data.message);
        return response.data;
      })
      .catch((error) => {
        showErrorToast(error.response.data.message);
        return thunkAPI.rejectWithValue(
          error.response.data || 'An error occurred'
        );
      });
  }
);

export const twoFactorverify = createAsyncThunk(
  'twoFactorAuth/verify',
  async ({ id, codes }: Arguments, thunkAPI) => {
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/user/verify2FA/${id}`;
      const response = await axios.post(url, { code: codes });
      showSuccessToast('Vendor Logged in successfully');
      return response.data;
    } catch (error: any) {
      showErrorToast(error.response.data.error);
      return thunkAPI.rejectWithValue(
        error.response?.data || 'An error occurred'
      );
    }
  }
);

const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
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
        needsVerification: false,
        needs2FA: false,
      };
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        const newToken = action.payload.message.includes('2FA')
          ? null
          : action.payload.token;

        localStorage.setItem('token', newToken!);

        let decodedUser = null;
        if (action.payload.token) {
          const decodedData = jwtDecode<DecodedToken>(action.payload.token);
          decodedUser = {
            id: decodedData.user.id,
            name: decodedData.user.name,
            email: decodedData.user.email,
          };
        }

        return {
          ...state,
          loading: false,
          message: action.payload.message,
          token: newToken,
          user: decodedUser,
          error: null,
        };
      }
    );
    builder.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        message: null,
        needsVerification: action.payload.message.includes('verify your email'),
      };
    });
    // 2FA reducers
    builder.addCase(twoFactorverify.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    });
    builder.addCase(twoFactorverify.fulfilled, (state, action) => {
      const newToken = action.payload.token;
      localStorage.setItem('token', newToken!);
      const decodedData = jwtDecode<DecodedToken>(action.payload.token);
      const decodedUser = {
        id: decodedData.user.id,
        name: decodedData.user.name,
        email: decodedData.user.email,
      };
      return {
        ...state,
        loading: false,
        token: newToken,
        message: 'Vendor Logged in successfully',
        error: null,
        user: decodedUser,
      };
    });
    builder.addCase(
      twoFactorverify.rejected,
      (state, action: PayloadAction<any>) => {
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          message: null,
        };
      }
    );
  },
});

export const { logout } = signInSlice.actions;

export default signInSlice.reducer;
