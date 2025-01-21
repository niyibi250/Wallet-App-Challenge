import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { showErrorToast, showSuccessToast } from '../../utils/ToastConfig';
import axios from 'axios';

interface Account {
  _id: string;
  accountName: string;
  accountNumber: string;
  accountType: 'debit' | 'credit' | 'saving';
  balance: number;
  user: string;
}

interface AccountState {
  accounts: Account[];
  loading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  accounts: [],
  loading: false,
  error: null,
};

const token = localStorage.getItem('token');
// const url = 'http://localhost:3000/api';
const url = 'https://wallet-app-challenge-backend.onrender.com/api'

export const fetchAccounts = createAsyncThunk('accounts/fetchAccounts', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${url}/accounts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    showErrorToast(errorMessage);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

export const createAccount = createAsyncThunk(
  'accounts/createAccount',
  async ({ accountData }: { accountData: { accountName: string; accountNumber: string; accountType: string; balance: number;} }, thunkAPI) => {
    try {
      const response = await axios.post(`${url}/accounts`, accountData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showSuccessToast('Account created successfully');
      return response.data;
    } catch (error: any) {
      showErrorToast(error.response?.data?.message || 'An error occurred');
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateAccount = createAsyncThunk(
  'accounts/updateAccount',
  async ({ accountId, accountData }: { accountId: string; accountData: { accountname: string; accountNumber: string; type: string; balance: number } }, thunkAPI) => {
    try {
      const response = await axios.put(`${url}/accounts?id=${accountId}`, accountData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showSuccessToast('Account updated successfully');
      return response.data;
    } catch (error: any) {
      showErrorToast(error.response?.data?.message || 'An error occurred');
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  'accounts/deleteAccount',
  async (accountId: string, thunkAPI) => {
    try {
        await axios.delete(`${url}/accounts?id=${accountId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showSuccessToast('Account deleted successfully');
      return accountId;
    } catch (error: any) {
      showErrorToast(error.response?.data?.message || 'An error occurred');
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// **Slice**

const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action: PayloadAction<Account[]>) => {
        state.loading = false;
        state.accounts = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create account
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state, action: PayloadAction<Account>) => {
        state.loading = false;
        state.accounts.push(action.payload);
      })
      .addCase(createAccount.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update account
      .addCase(updateAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccount.fulfilled, (state, action: PayloadAction<Account>) => {
        state.loading = false;
        const index = state.accounts.findIndex((acc) => acc._id === action.payload._id);
        if (index >= 0) {
          state.accounts[index] = action.payload;
        }
      })
      .addCase(updateAccount.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete account
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.accounts = state.accounts.filter((acc) => acc._id !== action.payload);
      })
      .addCase(deleteAccount.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = accountSlice.actions;
export default accountSlice.reducer;
