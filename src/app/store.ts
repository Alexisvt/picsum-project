import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import photoReducer, { PHOTO_NAMESPACE } from '../features/PhotoSlice';
import { baseAPIConfig } from './services/baseAPIConfig';

const store = configureStore({
  reducer: {
    [baseAPIConfig.reducerPath]: baseAPIConfig.reducer,
    [PHOTO_NAMESPACE]: photoReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseAPIConfig.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export default store;
