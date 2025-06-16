import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDrawerOpen: false,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    setDrawer: (state, action) => {
      state.isDrawerOpen = action.payload;
    },
  },
});

export const { toggleDrawer, setDrawer } = dashboardSlice.actions;
export default dashboardSlice.reducer;
