import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import locationReducer from "@/redux/features/locations/locationSlice";
import itinerariesReducer from "@/redux/features/itineraries/itinerariesSlice";

export const store = configureStore({
  reducer: {
    locations: locationReducer,
    itineraries: itinerariesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
