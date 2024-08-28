import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "vs-dark",
  fontSize: 14,
  fontFamily: "monospace",
  lineNumbers: "on",
  minimap: true,
  wordWrap: "off",
  errorMarking: false,
  highContrast: false,
};

const editorSettingsSlice = createSlice({
  name: "editorSettings",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setFontSize(state, action) {
      state.fontSize = action.payload;
    },
    setFontFamily(state, action) {
      state.fontFamily = action.payload;
    },
    setLineNumbers(state, action) {
      state.lineNumbers = action.payload;
    },
    setMinimap(state, action) {
      state.minimap = action.payload;
    },
    setWordWrap(state, action) {
      state.wordWrap = action.payload;
    },
    setErrorMarking(state, action) {
      state.errorMarking = action.payload;
    },
    setHighContrast(state, action) {
      state.highContrast = action.payload;
    },
  },
});

export const {
  setTheme,
  setFontSize,
  setFontFamily,
  setLineNumbers,
  setMinimap,
  setWordWrap,
  setErrorMarking,
  setHighContrast,
} = editorSettingsSlice.actions;

export default editorSettingsSlice.reducer;
