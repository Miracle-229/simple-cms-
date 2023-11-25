import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteTypeAction = createAsyncThunk(
  'documents/deleteDocument',
  async (payload) => {
    const deletedType = await axios.delete(
      `http://localhost:3001/types/${payload}`,
    );
    return deletedType.data;
  },
);

export const getTypeAction = createAsyncThunk(
  'documents/getDocuments',
  async () => {
    const response = await axios.get('http://localhost:3001/types');
    const { data, headers } = response;
    return {
      data,
      headers: {
        contentLength: headers['content-length'],
        contentType: headers['content-type'],
      },
    };
  },
);
export const typeSlice = createSlice({
  name: 'documents',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteTypeAction.fulfilled, (state, action) => {
        const deletedType = action.payload;
        Object.values(state).filter(
          (document) => document.id !== deletedType.id,
        );
        return state;
      })
      .addCase(getTypeAction.fulfilled, (state, action) => {
        const documents = action.payload;
        return documents;
      });
  },
});
