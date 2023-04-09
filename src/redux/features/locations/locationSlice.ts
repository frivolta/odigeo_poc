import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Location state
interface LocationState {
  locations: Location[];
}

// Initial Location state
const initialState: LocationState = {
  locations: [],
};

// GET - Get locations
export const getLocations = createAsyncThunk("location/fetch", async () => {
  //@ToDo: should be in a constant
  const response = await fetch("/getLocations", {
    method: "GET",
  });
  const data = response.json();
  return data;
});

export const LocationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLocations.fulfilled, (state, action) => {
      state.locations = action.payload;
    });
  },
});

export default LocationSlice.reducer;
