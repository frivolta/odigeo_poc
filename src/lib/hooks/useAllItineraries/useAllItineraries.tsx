import { useDispatch, useSelector } from "react-redux";
import {
  getItineraries,
  selectAllItineraries,
  selectErrors,
  selectIsLoading,
} from "@/redux/features/itineraries/itinerariesSlice";
import { RootState } from "@/redux/store";
import { useCallback, useEffect } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { SearchCriteria } from "@/types/common/SearchCriteria";
import { Itinerary } from "@/types/models/Itinerary";
import { convertDateToMilliseconds } from "@/lib/utils/common";
import { CustomError } from "@/types/common/CustomError";

const useAllItineraries = (): [
  Itinerary[],
  boolean,
  CustomError,
  (searchCriteria: SearchCriteria) => void
] => {
  const dispatch = useDispatch();
  const router = useRouter();
  const itineraries = useSelector((state: RootState) =>
    selectAllItineraries(state)
  );
  const isLoading = useSelector((state: RootState) => selectIsLoading(state));
  const errors = useSelector((state: RootState) => selectErrors(state));

  useEffect(() => {
    dispatch(
      getItineraries({
        departureLocation: undefined,
        arrivalLocation: undefined,
        departureDate: undefined,
      }) as unknown as AnyAction
    );
  }, [dispatch]);

  const searchItineraries = useCallback(
    (searchCriteria: SearchCriteria) => {
      const criteriaRecord: Record<string, string> = {
        departureLocation: searchCriteria.departureLocation || "",
        arrivalLocation: searchCriteria.arrivalLocation || "",
        departureDate: searchCriteria.departureDate
          ? convertDateToMilliseconds(searchCriteria.departureDate).toString()
          : "",
      };

      const queryParameters = new URLSearchParams(criteriaRecord).toString();
      router.push(`/search?${queryParameters}`);
    },
    [router]
  );

  return [itineraries, isLoading, errors, searchItineraries];
};

export default useAllItineraries;
