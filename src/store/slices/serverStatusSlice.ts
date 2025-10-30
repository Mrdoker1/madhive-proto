import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface ServerStatusData {
  server: string;
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
  memory: {
    used: number;
    total: number;
  };
}

export interface ServerStatusState {
  data: ServerStatusData | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

const initialState: ServerStatusState = {
  data: null,
  loading: false,
  error: null,
  lastUpdated: null,
};

// Async thunk for fetching server status
export const fetchServerStatus = createAsyncThunk(
  'serverStatus/fetchStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/status');
      if (!response.ok) {
        throw new Error('Failed to fetch server status');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const serverStatusSlice = createSlice({
  name: 'serverStatus',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetStatus: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
      state.lastUpdated = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServerStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServerStatus.fulfilled, (state, action: PayloadAction<ServerStatusData>) => {
        state.loading = false;
        state.data = action.payload;
        state.lastUpdated = new Date().toISOString();
        state.error = null;
      })
      .addCase(fetchServerStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, resetStatus } = serverStatusSlice.actions;

export default serverStatusSlice.reducer;