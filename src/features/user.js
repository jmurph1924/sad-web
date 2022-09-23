import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {};

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    loginUser: (state, action) => {
      state.value = action.payload;
    },

    logoutUser: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;