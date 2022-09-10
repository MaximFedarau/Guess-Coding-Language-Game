import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { codeSlice } from 'store/code/code.slice';

export const store = configureStore({
  reducer: combineReducers({
    [codeSlice.name]: codeSlice.reducer,
  }),
});
