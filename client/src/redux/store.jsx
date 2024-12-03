import { configureStore } from '@reduxjs/toolkit'
import travelPlansReducer from './travelPlans/travelPlansSlice'
import userReducer from './users/userSlice'

const store = configureStore({
  reducer: {
    travelPlans: travelPlansReducer,
    user: userReducer

  }
})

export default store