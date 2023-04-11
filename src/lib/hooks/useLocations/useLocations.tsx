import { useCallback, useEffect } from "react";
import {
  getLocations,
  selectAllLocations,
} from "@/redux/features/locations/locationSlice";
import { RootState } from "@/redux/store";
import { AnyAction } from "@reduxjs/toolkit";
import { filterItineraries } from "@/redux/features/itineraries/itinerariesSlice";
import { SearchCriteria } from "@/types/common/SearchCriteria";
import { Location } from "@/types/models/Location";
import { useDispatch, useSelector } from "react-redux";

//@ToDo: isLoading locations, error handling
const useLocations = (): [
  Location[],
  (searchCriteria: SearchCriteria) => void
] => {
  const dispatch = useDispatch();
  const locations = useSelector((state: RootState) =>
    selectAllLocations(state)
  );

  const searchItineraries = useCallback(
    (searchCriteria: SearchCriteria) => {
      dispatch(filterItineraries(searchCriteria));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getLocations() as unknown as AnyAction);
  }, [dispatch]);

  return [locations, searchItineraries];
};

export default useLocations;
