import { configureStore } from '@reduxjs/toolkit'
import travelPlansReducer from './travelPlans/travelPlansSlice'

const store = configureStore({
  reducer: {
    travelPlans: travelPlansReducer
  }
})

export default store