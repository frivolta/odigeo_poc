import { useCallback, useEffect } from "react";
import {
  getLocations,
  selectAllLocations,
} from "@/redux/features/locations/locationSlice";
import { RootState } from "@/redux/store";
import { AnyAction } from "@reduxjs/toolkit";
import { Location } from "@/types/models/Location";
import { useDispatch, useSelector } from "react-redux";

//Note: This hook is not using loading and error management for the sake of simplicity
const useLocations = (): [Location[]] => {
  const dispatch = useDispatch();
  const locations = useSelector((state: RootState) =>
    selectAllLocations(state)
  );

  useEffect(() => {
    dispatch(getLocations() as unknown as AnyAction);
  }, [dispatch]);

  return [locations];
};

export default useLocations;
