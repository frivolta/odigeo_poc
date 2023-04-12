import { convertMillisecondsToDate } from "@/lib/utils/common";
import { SearchCriteria } from "@/types/common/SearchCriteria";
import { useRouter } from "next/router";
import { useMemo } from "react";

const useSearchCriteria = (): SearchCriteria => {
  const router = useRouter();
  return useMemo(() => {
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
      return searchCriteria;
    }
    return {
      departureLocation: undefined,
      arrivalLocation: undefined,
      departureDate: undefined,
    };
  }, [router.isReady, router.query]);
};

export default useSearchCriteria;
