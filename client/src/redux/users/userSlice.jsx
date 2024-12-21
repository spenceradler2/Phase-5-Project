import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loggedInUser: null,
  loggedIn: false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload
      state.loggedIn = true
    },
    logoutUser: (state) => {
      state.loggedInUser = null
      state.loggedIn = false
    },
  },
})

export const { setLoggedInUser, logoutUser } = userSlice.actions

export default userSlice.reducer