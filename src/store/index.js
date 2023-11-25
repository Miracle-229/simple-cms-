import { configureStore } from '@reduxjs/toolkit';
import { documentsSlice } from './documentSlice';
import { typeSlice } from './typeSlice';

const store = configureStore({
  reducer: {
    documents: documentsSlice.reducer,
    types: typeSlice.reducer,
  },
  devTools: true,
});

export default store;
