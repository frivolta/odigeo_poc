import { CustomError } from "@/types/common/CustomError";
import { Itinerary } from "@/types/models/Itinerary";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Location state
interface ItineraryState {
  itineraries: Itinerary[];
  filteredItineraries: Itinerary[];
  loading: boolean;
  error: CustomError;
}

// Initial Location state
const initialState: ItineraryState = {
  itineraries: [],
  filteredItineraries: [],
  loading: false,
  error: { hasError: false, messages: [] },
};

// GET - Get itineraries
export const getItineraries = createAsyncThunk("itinerary/fetch", async () => {
  //@ToDo: should be in a constant
  const response = await fetch(`/api/getItineraries`, {
    method: "GET",
  });
  const data = response.json();
  return data;
});

export const ItinerarySlice = createSlice({
  name: "itinerary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getItineraries.fulfilled, (state, action) => {
      state.error = { hasError: false, messages: [] };
      state.loading = false;
      state.itineraries = action.payload;
      state.filteredItineraries = [];
    });
    builder.addCase(getItineraries.pending, (state, action) => {
      state.error = { hasError: false, messages: [] };
      state.loading = true;
      state.itineraries = [];
      state.filteredItineraries = [];
    });
    // @ToDo: Custom error messages and refactor to const, add same to other reducers
    builder.addCase(getItineraries.rejected, (state, action) => {
      state.error = { hasError: true, messages: ["Something went wrong"] };
      state.loading = false;
      state.itineraries = [];
      state.filteredItineraries = [];
    });
  },
});

export default ItinerarySlice.reducer;
