import { RootState } from "@/redux/store";
import { CustomError } from "@/types/common/CustomError";
import { compareDates, parseDateTime } from "@/types/common/DateTime";
import { SearchCriteria } from "@/types/common/SearchCriteria";
import {
  DraftItinerary,
  Itinerary,
  addIdToItineraries,
  sortByPrice,
} from "@/types/models/Itinerary";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Location state
interface ItineraryState {
  itineraries: Itinerary[];
  filteredItineraries: Itinerary[];
  isFiltered: boolean;
  loading: boolean;
  error: CustomError;
}

// Initial Location state
const initialState: ItineraryState = {
  itineraries: [],
  filteredItineraries: [],
  isFiltered: false,
  loading: false,
  error: { hasError: false, messages: [] },
};

// GET - Get itineraries
export const getItineraries = createAsyncThunk(
  "itinerary/fetch",
  async (searchCriteria: SearchCriteria) => {
    const response = await fetch(`/api/getItineraries`, {
      method: "GET",
    });
    const data: DraftItinerary[] = await response.json();
    const itineraries = addIdToItineraries(data);
    // Note: This is just for the sake of example, in a real world scenario it can easy be a compose function
    return sortByPrice(filterItineraries(itineraries, searchCriteria));
  }
);

const filterItineraries = (
  itineraries: Itinerary[],
  searchCriteria: SearchCriteria
) => {
  const { departureLocation, arrivalLocation, departureDate } = searchCriteria;

  // Note: This is just for the sake of example, in a real world scenario it would be a factory function so that more filters can be added easily
  return itineraries.filter((itinerary) => {
    const matchesDepartureLocation =
      !departureLocation ||
      itinerary.departureLocation.toLowerCase() === departureLocation;
    const matchesArrivalLocation =
      !arrivalLocation ||
      itinerary.arrivalLocation.toLowerCase() === arrivalLocation;
    const matchesDepartureDate =
      !departureDate ||
      compareDates(itinerary.departureDate, parseDateTime(departureDate));
    return (
      matchesDepartureLocation && matchesArrivalLocation && matchesDepartureDate
    );
  });
};

export const ItinerarySlice = createSlice({
  name: "itinerary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getItineraries.fulfilled, (state, action) => {
      state.error = { hasError: false, messages: [] };
      state.loading = false;
      state.itineraries = sortByPrice(action.payload);
      state.filteredItineraries = action.payload;
    });
    builder.addCase(getItineraries.pending, (state, action) => {
      state.error = { hasError: false, messages: [] };
      state.loading = true;
      state.itineraries = [];
      state.filteredItineraries = [];
    });
    // Note: Custom error handling should be implemented, not used just for the sake of example
    builder.addCase(getItineraries.rejected, (state, action) => {
      state.error = { hasError: true, messages: ["Something went wrong"] };
      state.loading = false;
      state.itineraries = [];
      state.filteredItineraries = [];
    });
  },
});

export const selectAllItineraries = (state: RootState) =>
  state.itineraries.itineraries;
export const selectFilteredItineraries = (state: RootState) =>
  state.itineraries.filteredItineraries;
export const selectIsLoading = (state: RootState) => state.itineraries.loading;
export const selectErrors = (state: RootState) => state.itineraries.error;

export default ItinerarySlice.reducer;
