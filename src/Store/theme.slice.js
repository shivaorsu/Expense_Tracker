import { createSlice } from "@reduxjs/toolkit";

const themeReducer = createSlice({
  name: "theme",
  initialState: {
    darkMode: false,
  },
  reducers: {
    changeTheme(state, action) {
      console.log(action);
      state.darkMode=!state.darkMode
    },
  },
});

export const themeActions = themeReducer.actions;
export default themeReducer.reducer