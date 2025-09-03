import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';

import { authSlice } from './slices/authSlice';
import { supabaseApi } from './supabase/supabaseAPI';

export const store = configureStore({
  reducer: {
    [supabaseApi.reducerPath]: supabaseApi.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(supabaseApi.middleware),
  enhancers: (getDefaultEnhancers) => {
    if (__DEV__) {
      return getDefaultEnhancers().concat(devToolsEnhancer({ trace: true }));
    }

    return getDefaultEnhancers();
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
