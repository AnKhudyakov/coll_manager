import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import collectionReducer from "@/features/collection/collectionSlice";
import { authApi } from "./services/auth";
import { collectionApi } from "./services/collection";
import { itemApi } from "./services/item";
import { userApi } from "./services/user";
import { tagApi } from "./services/tag";
import { uploadImageApi } from "./services/uplooadImage";
import { commentApi } from "./services/comment";
import { searchApi } from "./services/search";

const rootReducer = combineReducers({
  auth: authReducer,
  collection: collectionReducer,
  [authApi.reducerPath]: authApi.reducer,
  [collectionApi.reducerPath]: collectionApi.reducer,
  [itemApi.reducerPath]: itemApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [tagApi.reducerPath]: tagApi.reducer,
  [uploadImageApi.reducerPath]: uploadImageApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(collectionApi.middleware)
      .concat(itemApi.middleware)
      .concat(userApi.middleware)
      .concat(tagApi.middleware)
      .concat(uploadImageApi.middleware)
      .concat(commentApi.middleware)
      .concat(searchApi.middleware),
});
