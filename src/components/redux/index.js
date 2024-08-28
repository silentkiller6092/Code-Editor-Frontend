import { configureStore } from "@reduxjs/toolkit";
import editorSettingsReducer from "./editorSettingsSlice";

const store = configureStore({
  reducer: {
    editorSettings: editorSettingsReducer,
  },
});

export default store;
