import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, getMe } from '../../api/authAPI';

const initialState = {
  user: null,
  token: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await login(email, password);
      return response;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  },
);

export const fetchMe = createAsyncThunk('auth/fetchMe', async (_, thunkAPI) => {
  try {
    const response = await getMe();
    return response;
  } catch (error) {
    if (error.response) {
      const message = error.response.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => {
      localStorage.removeItem('token');
    },
    reset: (state) => {
      state.user = null;
      state.token = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //fetchMe
    builder.addCase(fetchMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload.user;
    });
    builder.addCase(fetchMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { logOut, reset } = authSlice.actions;

export default authSlice.reducer;
