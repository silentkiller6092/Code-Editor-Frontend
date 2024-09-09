import { configureStore } from "@reduxjs/toolkit";
import editorSettingsReducer from "./editorSettingsSlice";
import AuthSlice from "./AuthSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";

// Define the persist config
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  editorSettings: editorSettingsReducer,
  auth: AuthSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

// Create the persistor to persist the store
export const persistor = persistStore(store);

export default store;
