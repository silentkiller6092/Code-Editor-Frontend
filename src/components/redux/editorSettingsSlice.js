import { createSlice } from "@reduxjs/toolkit";

const editorSettingsSlice = createSlice({
  name: "editorSettings",
  initialState: {
    theme: "vs-dark",
    fontSize: 14,
    fontFamily: "monospace",
    lineNumbers: "on",
    minimap: true,
    wordWrap: "off",
    errorMarking: true,
    lineHeight: 18,
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload; // Update theme with name, rules, and colors
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    setFontFamily: (state, action) => {
      state.fontFamily = action.payload;
    },
    setLineNumbers: (state, action) => {
      state.lineNumbers = action.payload;
    },
    setMinimap: (state, action) => {
      state.minimap = action.payload;
    },
    setWordWrap: (state, action) => {
      state.wordWrap = action.payload;
    },
    setErrorMarking: (state, action) => {
      state.errorMarking = action.payload;
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
} = editorSettingsSlice.actions;
export default editorSettingsSlice.reducer;
