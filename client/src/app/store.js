import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import collectionReducer from "@/features/collection/collectionSlice";
import { authApi } from "./services/auth";
import { collectionApi } from "./services/collection";
import { itemApi } from "./services/item";
import { userApi } from "./services/user";
import { uploadImageApi } from "./services/uplooadImage";

const rootReducer = combineReducers({
  auth: authReducer,
  collection: collectionReducer,
  [authApi.reducerPath]: authApi.reducer,
  [collectionApi.reducerPath]: collectionApi.reducer,
  [itemApi.reducerPath]: itemApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [uploadImageApi.reducerPath]: uploadImageApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(collectionApi.middleware)
      .concat(itemApi.middleware)
      .concat(userApi.middleware)
      .concat(uploadImageApi.middleware),
});
