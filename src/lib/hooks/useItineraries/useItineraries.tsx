import { useDispatch, useSelector } from "react-redux";
import {
  getItineraries,
  selectAllItineraries,
} from "@/redux/features/itineraries/itinerariesSlice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { AnyAction } from "@reduxjs/toolkit";

const useItineraries = () => {
  const dispatch = useDispatch();
  const itineraries = useSelector((state: RootState) =>
    selectAllItineraries(state)
  );
  useEffect(() => {
    dispatch(getItineraries() as unknown as AnyAction);
  }, [dispatch]);

  return [itineraries];
};

export default useItineraries;
