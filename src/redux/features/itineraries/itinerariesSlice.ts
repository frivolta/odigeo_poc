import { RootState } from "@/redux/store";
import { CustomError } from "@/types/common/CustomError";
import { SearchCriteria } from "@/types/common/SearchCriteria";
import {
  DraftItinerary,
  Itinerary,
  addIdToItineraries,
} from "@/types/models/Itinerary";
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
  const data: DraftItinerary[] = await response.json();
  return addIdToItineraries(data);
});

export const ItinerarySlice = createSlice({
  name: "itinerary",
  initialState,
  reducers: {
    filterItineraries: (state, action: PayloadAction<SearchCriteria>) => {
      const { departureLocation, arrivalLocation, departureDate } =
        action.payload;

      state.filteredItineraries = state.itineraries.filter((itinerary) => {
        const matchesDepartureLocation =
          !departureLocation ||
          itinerary.departureLocation.toLowerCase() === departureLocation;
        const matchesArrivalLocation =
          !arrivalLocation ||
          itinerary.arrivalLocation.toLowerCase() === arrivalLocation;
        //@ToDo: this can cause problems
        const matchesDepartureDate =
          !departureDate ||
          itinerary.departureDate.toString() === departureDate;

        return (
          matchesDepartureLocation &&
          matchesArrivalLocation &&
          matchesDepartureDate
        );
      });
      console.log(state.filteredItineraries);
    },
  },
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

export const { filterItineraries } = ItinerarySlice.actions;
export const selectAllItineraries = (state: RootState) =>
  state.itineraries.filteredItineraries.length > 0
    ? state.itineraries.filteredItineraries
    : state.itineraries.itineraries;
export default ItinerarySlice.reducer;
