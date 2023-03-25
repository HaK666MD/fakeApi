import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProduct } from '../../interface/IProduct';

interface ProductState {
  info: IProduct | null;
  isLoading: boolean;
  error: string;
}

const initialState: ProductState = {
  info: null,
  isLoading: false,
  error: ''
};

export const fetchDetails = createAsyncThunk(
  '@@product/details',
  async (id: string, thunkAPI) => {
    try {
      const { data } = await axios.get<IProduct>(
        `https://fakestoreapi.com/products/${id}`
      );
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const detailSlice = createSlice({
  name: '@@product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDetails.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchDetails.fulfilled.type,
        (state, action: PayloadAction<IProduct>) => {
          state.isLoading = false;
          state.error = '';
          state.info = action.payload;
        }
      )
      .addCase(
        fetchDetails.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  }
});
export const detailReducer = detailSlice.reducer;
