import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  travelPlans: [],
  travelPlansUserId: [],  
  travelPlansLocationId: [],  
  status: 'idle', 
  error: null
}

export const fetchTravelPlans = createAsyncThunk(
  'travelPlans/fetchTravelPlans',
  async () => {
    const response = await fetch("http://localhost:5555/api/travel_plans")
    if (!response.ok) {
      throw new Error('Failed to fetch travel plans')
    }
    const data = await response.json()
    return data
  }
)

export const fetchTravelPlansUserId = createAsyncThunk(
  'travelPlans/fetchTravelPlansUserId',
  async (userId) => {
    const response = await fetch(`http://localhost:5555/api/user/${userId}`)
    const data = await response.json()
    return data
  }
)

export const fetchTravelPlansLocationId = createAsyncThunk(
  'travelPlans/fetchTravelPlansLocationId',
  async (locationId) => {
    const response = await fetch(`http://localhost:5555/api/location/${locationId}`)
    const data = await response.json()
    return data
  }
)

export const addTravelPlan = createAsyncThunk(
  'travelPlans/addTravelPlan',
  async (newTravelPlan) => {
    const response = await fetch("http://localhost:5555/api/travel_plans", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTravelPlan)
    })
    if (!response.ok) {
      throw new Error('Failed to add travel plan')
    }
    const data = await response.json()
    return data
  })

export const deleteTravelPlan = createAsyncThunk(
  'travelPlans/deleteTravelPlan',
  async (id) => {
    const response = await fetch(`http://localhost:5555/api/travel_plans/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error('Failed to delete travel plan')
    }
    return id
  }
)

export const updateTravelPlan = createAsyncThunk(
    'travelPlans/updateTravelPlan',
    async ({id,values}) => {
      const response = await fetch(`http://localhost:5555/api/travel_plans/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      if (!response.ok) {
        throw new Error('Failed to update travel plan')
      }
      const data = await response.json()
      return data
    }
  )

const travelPlansSlice = createSlice({
  name: 'travelPlans',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTravelPlans.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTravelPlans.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.travelPlans = action.payload
      })
      .addCase(fetchTravelPlans.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchTravelPlansUserId.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.travelPlansUserId = action.payload
      })
      .addCase(fetchTravelPlansLocationId.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.travelPlansLocationId = action.payload
      })
      .addCase(addTravelPlan.fulfilled, (state, action) => {
        state.travelPlans.push(action.payload)
      })
      .addCase(deleteTravelPlan.fulfilled, (state, action) => {
        state.travelPlans = state.travelPlans.filter(travelPlan => travelPlan.id !== action.payload)
      })
      .addCase(updateTravelPlan.fulfilled, (state, action) => {
        const updatedPlan = action.payload;
        state.travelPlans = state.travelPlans.map(travelPlan =>
          travelPlan.id === updatedPlan.id ? updatedPlan : travelPlan
        );
      })
  }
})

export default travelPlansSlice.reducer