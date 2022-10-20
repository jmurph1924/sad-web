import { createSlice } from "@reduxjs/toolkit";
//Setting Initial Value
const initialStateValue = {};

//Exporting and Creation of User V
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