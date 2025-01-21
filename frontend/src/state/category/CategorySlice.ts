import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { showErrorToast, showSuccessToast } from '../../utils/ToastConfig';
import axios from 'axios';

interface Category {
  _id: string;
  name: string;
  subcategories: { name: string }[];
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const token = localStorage.getItem('token');
// **Async Thunks**

// const url = 'http://localhost:3000/api'
  const url = 'https://wallet-app-challenge-backend.onrender.com/api'

// Fetch all categories

export const fetchCategories = createAsyncThunk<Category[]>('categories/fetchCategories', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${url}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || 'An error occurred';
    showErrorToast(errorMessage);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

// Create a category
export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (
    { categoryData }: { categoryData: { name: string; subcategories: { name: string }[] } },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(`${url}/categories`, categoryData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showSuccessToast('Category created successfully');
      return response.data;
    } catch (error: any) {
      showErrorToast(error.response?.data?.message || 'An error occurred');
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);



// Add a subcategory to a category
export const addSubCategory = createAsyncThunk(
  'categories/addSubCategory',
  async ({ categoryId, subcategoryName }: { categoryId: string; subcategoryName: string }, thunkAPI) => {
    try {
      const response = await axios.post(`/api/categories/create/${categoryId}/subcategory`, {
        name: subcategoryName,
      });
      return { categoryId, subcategory: response.data };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'An error occurred';
      showErrorToast(errorMessage);
      return thunkAPI.rejectWithValue({ message: errorMessage });
    }
  }
);

// **Slice**

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add subcategory
      .addCase(addSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSubCategory.fulfilled, (state, action: PayloadAction<{ categoryId: string; subcategory: { name: string } }>) => {
        state.loading = false;
        const category = state.categories.find((cat) => cat._id === action.payload.categoryId);
        if (category) {
          category.subcategories.push(action.payload.subcategory);
        }
      })
      .addCase(addSubCategory.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = categorySlice.actions;
export default categorySlice.reducer;
