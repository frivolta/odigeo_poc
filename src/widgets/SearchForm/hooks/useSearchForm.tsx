import { useState, useCallback, FormEvent } from "react";
import { Location } from "@/types/models/Location";

interface UseSearchFormState {
  departureLocation: Location | null;
  setDepartureLocation: React.Dispatch<React.SetStateAction<Location | null>>;
  arrivalLocation: Location | null;
  setArrivalLocation: React.Dispatch<React.SetStateAction<Location | null>>;
  departureDate: Date | null;
  setDepartureDate: React.Dispatch<React.SetStateAction<Date | null>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const useSearchForm = (onSubmit: (data: any) => void): UseSearchFormState => {
  const [departureLocation, setDepartureLocation] = useState<Location | null>(
    null
  );
  const [arrivalLocation, setArrivalLocation] = useState<Location | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit({
        departureDate: departureDate ?? undefined,
        arrivalLocation: arrivalLocation?.value ?? undefined,
        departureLocation: departureLocation?.value ?? undefined,
      });
    },
    [arrivalLocation, departureDate, departureLocation, onSubmit]
  );

  return {
    departureLocation,
    setDepartureLocation,
    arrivalLocation,
    setArrivalLocation,
    departureDate,
    setDepartureDate,
    handleSubmit,
  };
};
export default useSearchForm;
