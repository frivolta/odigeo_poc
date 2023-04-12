import {
  getItineraries,
  selectErrors,
  selectFilteredItineraries,
  selectIsLoading,
} from "@/redux/features/itineraries/itinerariesSlice";
import { SearchCriteria } from "@/types/common/SearchCriteria";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertMillisecondsToDate } from "@/lib/utils/common";
import { AnyAction } from "@reduxjs/toolkit";
import { Itinerary } from "@/types/models/Itinerary";
import { CustomError } from "@/types/common/CustomError";

const useSearchItineraries = (): [Itinerary[], boolean, CustomError] => {
  const dispatch = useDispatch();
  const router = useRouter();
  const filteredItineraries = useSelector((state: RootState) =>
    selectFilteredItineraries(state)
  );
  const isLoading = useSelector((state: RootState) => selectIsLoading(state));
  const errors = useSelector((state: RootState) => selectErrors(state));

  useEffect(() => {
    if (router.isReady) {
      const { departureLocation, arrivalLocation, departureDate } =
        router.query;

      const searchCriteria: SearchCriteria = {
        departureLocation: (departureLocation as string) ?? undefined,
        arrivalLocation: (arrivalLocation as string) ?? undefined,
        departureDate: departureDate
          ? convertMillisecondsToDate(departureDate as string)
          : undefined,
      };
      dispatch(getItineraries(searchCriteria) as unknown as AnyAction);
    }
  }, [router.isReady, router.query]);

  return [filteredItineraries, isLoading, errors];
};

export default useSearchItineraries;
