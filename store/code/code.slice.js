import { createSlice } from '@reduxjs/toolkit';

export const codeSlice = createSlice({
  name: 'codeSlice',
  initialState: {
    data: '',
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = codeSlice.actions;
