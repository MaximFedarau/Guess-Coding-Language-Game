import { createSelector } from '@reduxjs/toolkit';

const codeSliceSelector = (state) => state.codeSlice;

export const codeDataSelector = createSelector(
  [codeSliceSelector],
  (codeSlice) => codeSlice.data,
);
