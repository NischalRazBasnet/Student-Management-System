import { createSlice } from '@reduxjs/toolkit';
import { getFromLocal, removeFromLocal, setToLocal } from '../local/local';

export const adminSlice = createSlice({
  name: 'adminSlice',
  initialState: {
    admin: getFromLocal(),
  },
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
      setToLocal(state.admin);
    },
    removeAdmin: (state) => {
      state.admin = null;
      removeFromLocal();
    },
  },
});

export const { setAdmin, removeAdmin } = adminSlice.actions;
