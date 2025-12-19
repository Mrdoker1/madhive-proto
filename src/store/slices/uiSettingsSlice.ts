import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UISettingsState {
  showNavigationAnchors: boolean;
}

const initialState: UISettingsState = {
  showNavigationAnchors: false, // Hidden by default
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
  },
});

export const { setShowNavigationAnchors, toggleNavigationAnchors } = uiSettingsSlice.actions;

export default uiSettingsSlice.reducer;
