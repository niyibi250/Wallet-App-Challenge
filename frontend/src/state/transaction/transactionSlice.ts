import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { showErrorToast, showSuccessToast } from '../../utils/ToastConfig';
import { Transaction } from '../../types/transactionType';
import axios from 'axios';

interface TransactionData {
    account: string;
    category: string;
    subcategory?: string;
    amount: number;
    type: 'income' | 'expense' | 'saving';
    date: string;
    notes: string;
  }
interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

const token = localStorage.getItem('token');
// const url = 'http://localhost:3000/api';
const url = 'https://wallet-app-challenge-backend.onrender.com/api';

// **Async Thunks**

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/transactions`, {
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
  }
);

export const createTransaction = createAsyncThunk('transactions/createTransaction',
    async ({ transactionData }: { transactionData: TransactionData },thunkAPI) => {
      try {
        const response = await axios.post(`${url}/transactions`, transactionData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        showSuccessToast('Transaction created successfully');
        return response.data;
      } catch (error: any) {
        showErrorToast(error.response?.data?.message || 'An error occurred');
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
      }
    }
  );

export const updateTransaction = createAsyncThunk(
  'transactions/updateTransaction',
  async (
    {
      transactionId,
      transactionData,
    }: { transactionId: string; transactionData: Partial<Omit<Transaction, '_id' | 'createdAt' | 'updatedAt'>> },
    thunkAPI
  ) => {
    try {
      const response = await axios.put(`${url}/transactions?id=${transactionId}`, transactionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showSuccessToast('Transaction updated successfully');
      return response.data;
    } catch (error: any) {
      showErrorToast(error.response?.data?.message || 'An error occurred');
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (transactionId: string, thunkAPI) => {
    try {
      await axios.delete(`${url}/transactions?id=${transactionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showSuccessToast('Transaction deleted successfully');
      return transactionId;
    } catch (error: any) {
      showErrorToast(error.response?.data?.message || 'An error occurred');
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// **Slice**

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Create transaction
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action: PayloadAction<Transaction>) => {
        state.loading = false;
        state.transactions.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Update transaction
      .addCase(updateTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTransaction.fulfilled, (state, action: PayloadAction<Transaction>) => {
        state.loading = false;
        const index = state.transactions.findIndex((t) => t._id === action.payload._id);
        if (index >= 0) {
          state.transactions[index] = action.payload;
        }
      })
      .addCase(updateTransaction.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Delete transaction
      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.transactions = state.transactions.filter((t) => t._id !== action.payload);
      })
      .addCase(deleteTransaction.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { resetError } = transactionSlice.actions;
export default transactionSlice.reducer;
