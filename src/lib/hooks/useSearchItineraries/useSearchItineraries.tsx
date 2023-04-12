import {
  getItineraries,
  selectErrors,
  selectFilteredItineraries,
  selectIsLoading,
} from "@/redux/features/itineraries/itinerariesSlice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { Itinerary } from "@/types/models/Itinerary";
import { CustomError } from "@/types/common/CustomError";
import useSearchCriteria from "../useSearchCriteria/useSearchCriteria";

const useSearchItineraries = (): [Itinerary[], boolean, CustomError] => {
  const dispatch = useDispatch();
  const searchParams = useSearchCriteria();
  const filteredItineraries = useSelector((state: RootState) =>
    selectFilteredItineraries(state)
  );
  const isLoading = useSelector((state: RootState) => selectIsLoading(state));
  const errors = useSelector((state: RootState) => selectErrors(state));

  useEffect(() => {
    dispatch(getItineraries(searchParams) as unknown as AnyAction);
  }, [searchParams, dispatch]);

  return [filteredItineraries, isLoading, errors];
};

export default useSearchItineraries;
