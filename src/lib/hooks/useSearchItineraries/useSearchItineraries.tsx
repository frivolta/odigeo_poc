import {
  getItineraries,
  selectFilteredItineraries,
} from "@/redux/features/itineraries/itinerariesSlice";
import { SearchCriteria } from "@/types/common/SearchCriteria";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertMillisecondsToDate } from "@/lib/utils/common";
import { AnyAction } from "@reduxjs/toolkit";

const useSearchItineraries = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const filteredItineraries = useSelector((state: RootState) =>
    selectFilteredItineraries(state)
  );

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

  return filteredItineraries;
};

export default useSearchItineraries;
