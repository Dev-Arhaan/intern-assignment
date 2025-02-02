/* eslint-disable prefer-const */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockData } from "../redux/stockSlice";
import { RootState } from "../redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useAppDispatch = () => useDispatch<ThunkDispatch<RootState, any, any>>();

const StockDataFetcher = () => {
  const dispatch = useAppDispatch();
  const { selectedStockId, selectedDuration } = useSelector(
    (state: RootState) => state.stocks
  );

  useEffect(() => {
    if (!selectedStockId || !selectedDuration) return;

    let interval: NodeJS.Timeout;

    const fetchData = async () => {
      const resultAction = await dispatch(
        fetchStockData({ stockId: selectedStockId, duration: selectedDuration })
      );
      const status = resultAction.payload?.status;

      // Stop polling if status is COMPLETE
      if (status === "COMPLETE") {
        clearInterval(interval);
      }
    };

    fetchData(); // Fetch immediately

    interval = setInterval(fetchData, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount or change in dependencies
  }, [selectedStockId, selectedDuration, dispatch]);

  return null;
};

export default StockDataFetcher;
