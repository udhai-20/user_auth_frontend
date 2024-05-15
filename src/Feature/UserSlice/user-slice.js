import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  user:[],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerStart: (state) => {
      state.loading = true;
    },

    registerSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginStart: (state) => {
      state.loading = true;
    },

    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getUserStart: (state) => {
      state.loading = true;
    },

    getUserSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
    },
    getUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user =[];
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },   
    logout: (state) => {
      state.user=[]
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  getUserStart,
  getUserSuccess,
  getUserFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  logout
  
} = userSlice.actions;

export default userSlice.reducer;