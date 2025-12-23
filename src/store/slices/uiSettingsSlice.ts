import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UISettingsState {
  showNavigationAnchors: boolean;
  showFlightByDay: boolean;
  showDaypartsSelector: boolean;
}

const initialState: UISettingsState = {
  showNavigationAnchors: false, // Hidden by default
  showFlightByDay: false, // Hidden by default
  showDaypartsSelector: false, // Hidden by default
};

const uiSettingsSlice = createSlice({
  name: 'uiSettings',
  initialState,
  reducers: {
    setShowNavigationAnchors: (state, action: PayloadAction<boolean>) => {
      state.showNavigationAnchors = action.payload;
    },
    toggleNavigationAnchors: (state) => {
      state.showNavigationAnchors = !state.showNavigationAnchors;
    },
    setShowFlightByDay: (state, action: PayloadAction<boolean>) => {
      state.showFlightByDay = action.payload;
    },
    toggleFlightByDay: (state) => {
      state.showFlightByDay = !state.showFlightByDay;
    },
    setShowDaypartsSelector: (state, action: PayloadAction<boolean>) => {
      state.showDaypartsSelector = action.payload;
    },
  },
});

export const { 
  setShowNavigationAnchors, 
  toggleNavigationAnchors,
  setShowFlightByDay,
  toggleFlightByDay,
  setShowDaypartsSelector
} = uiSettingsSlice.actions;

export default uiSettingsSlice.reducer;
