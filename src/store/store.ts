import { configureStore } from '@reduxjs/toolkit';
import serverStatusReducer from '@/store/slices/serverStatusSlice';
import campaignReducer from '@/store/slices/campaignSlice';
import uiSettingsReducer from '@/store/slices/uiSettingsSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      serverStatus: serverStatusReducer,
      campaign: campaignReducer,
      uiSettings: uiSettingsReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];