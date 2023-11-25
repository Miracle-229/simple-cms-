import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteDocumentAction = createAsyncThunk(
  'documents/deleteDocument',
  async (payload) => {
    const deletedDocument = await axios.delete(
      `http://localhost:3001/documents/${payload}`,
    );
    return deletedDocument.data;
  },
);

export const getDocumentsAction = createAsyncThunk(
  'documents/getDocuments',
  async () => {
    const response = await axios.get('http://localhost:3001/documents');
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

export const addItemAction = createAsyncThunk('addItem', async (payload) => {
  const response = await axios.post('http://localhost:3001/documents', payload);
  console.log(response.data);
  return response.data;
});

export const updateDocumentAction = createAsyncThunk(
  'documents/updateDocument',
  async ({ id, payload }) => {
    const response = await axios.put(
      `http://localhost:3001/documents/${id}`,
      payload,
    );
    return response.data;
  },
);

export const getDocumentAction = createAsyncThunk(
  'documents/getDocument',
  async (documentId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/documents/${documentId}`,
      );
      return response.data;
    } catch (error) {
      throw new Error('Error fetching document');
    }
  },
);

export const documentsSlice = createSlice({
  name: 'documents',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteDocumentAction.fulfilled, (state, action) => {
        const deletedDocument = action.payload;
        const updatedState = Object.values(state).filter(
          (document) => document.id !== deletedDocument.id,
        );
        return updatedState;
      })
      .addCase(getDocumentsAction.fulfilled, (state, action) => {
        const documents = action.payload;
        return documents;
      })
      .addCase(addItemAction.fulfilled, (state, action) => {
        const newState = state;
        newState.loading = false;
        newState.item = action.payload;
      })
      .addCase(updateDocumentAction.fulfilled, (state, action) => {
        const newState = state;
        newState.item = action.payload;
        newState.isLoading = false;
      })
      .addCase(getDocumentAction.fulfilled, (state, action) => {
        const document = action.payload;
        const newState = Object.values(state);
        const index = newState.findIndex((d) => d.id === document.id);
        if (index !== -1) {
          newState[index] = document;
        } else {
          newState.push(document);
        }
      });
  },
});
