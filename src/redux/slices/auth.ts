import { ILogin } from './../../interface/ILogin';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  userToken: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userToken: null,
  isLoading: false,
  error: null
};

export const fetchUser = createAsyncThunk(
  '@@auth/login',
  async (req: ILogin, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `https://fakestoreapi.com/auth/login`,
        req
      );
      localStorage.setItem('Token', data.token);
      return data.token;
    } catch (error) {
      return rejectWithValue('Wrong Login or Password');
    }
  }
);

export const authSlice = createSlice({
  name: '@@auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.userToken = null;
      localStorage.removeItem('Token');
      state.isLoading = false;
    },
    me: (state, action) => {
      state.userToken = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchUser.fulfilled.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.userToken = action.payload;
        }
      )
      .addCase(
        fetchUser.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  }
});

export const authReducer = authSlice.reducer;
export const { logout, me } = authSlice.actions;
