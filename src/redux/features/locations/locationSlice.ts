import { RootState } from "@/redux/store";
import { stringToLocation } from "@/types/models/Location";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location } from "@/types/models/Location";

// Location state
interface LocationState {
  locations: Location[];
}

// Initial Location state
const initialState: LocationState = {
  locations: [],
};

// GET - Get locations
export const getLocations = createAsyncThunk<string[]>(
  "location/fetch",
  async () => {
    const response = await fetch(`/api/getLocations`, {
      method: "GET",
    });
    const data: string[] = await response.json();
    return data;
  }
);

export const LocationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  // Note: extraReducers must be implemented for other states, not implemented for the sake of the example
  extraReducers: (builder) => {
    builder.addCase(getLocations.fulfilled, (state, action) => {
      state.locations = stringToLocation(action.payload);
    });
  },
});

export const selectAllLocations = (state: RootState) =>
  state.locations.locations;
export default LocationSlice.reducer;
