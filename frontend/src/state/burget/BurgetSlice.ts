import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { showErrorToast, showSuccessToast } from '../../utils/ToastConfig';
import axios from 'axios';

interface Budget {
  amount: number;
  startDate: string;
  endDate: string;
  category: string[];
}

interface BudgetState {
  budgets: Budget[];
  loading: boolean;
  error: string | null;
}

const initialState: BudgetState = {
  budgets: [],
  loading: false,
  error: null,
};

const token = localStorage.getItem('token');
// const url = 'http://localhost:3000/api';
const url = 'https://wallet-app-challenge-backend.onrender.com/api'

export const fetchBudgets = createAsyncThunk<Budget[]>('budgets/fetchBudgets', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${url}/budgets`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    showErrorToast(errorMessage);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

// Create a budget
export const createBudget = createAsyncThunk('budgets/createBudget', async (
  { budgetData }: { budgetData: Budget },
  thunkAPI
) => {
  try {
    const response = await axios.post(`${url}/budgets`, budgetData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    showSuccessToast('Budget created successfully');
    return response.data;
  } catch (error: any) {
    showErrorToast(error.response?.data?.message || 'An error occurred');
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});


// **Slice**
const budgetSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBudgets.fulfilled, (state, action: PayloadAction<Budget[]>) => {
        state.loading = false;
        state.budgets = action.payload;
      })
      .addCase(fetchBudgets.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(createBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBudget.fulfilled, (state, action: PayloadAction<Budget>) => {
        state.loading = false;
        state.budgets.push(action.payload);
      })
      .addCase(createBudget.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }) 
  },
});

export const { resetError } = budgetSlice.actions;
export default budgetSlice.reducer;
