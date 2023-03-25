import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProduct } from '../../interface/IProduct';

interface ProductState {
  list: IProduct[];
  isLoading: boolean;
  error: string;
}

const initialState: ProductState = {
  list: [],
  isLoading: false,
  error: ''
};

export const fetchProducts = createAsyncThunk(
  '@@products/getAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get<IProduct[]>(
        `https://fakestoreapi.com/products`
      );
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const productSlice = createSlice({
  name: '@@products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending.type, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.list = action.payload;
    });
    builder.addCase(
      fetchProducts.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  }
});

export const productReducer = productSlice.reducer;
