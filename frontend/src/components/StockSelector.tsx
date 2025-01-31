import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store"; // Import typed dispatch
import {
  fetchStocks,
  fetchStockData,
  setSelectedStock,
  setSelectedDuration,
} from "../redux/stockSlice";

const StockSelector = () => {
  const dispatch = useAppDispatch();
  const { stocks, selectedStockId, selectedDuration } = useSelector(
    (state: RootState) => state.stocks
  );

  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  // Handles stock selection
  const handleStockChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const stockId = event.target.value;
    dispatch(setSelectedStock(stockId));
    dispatch(setSelectedDuration("")); // Reset duration when stock changes
  };

  // Handles duration selection (only if stock is selected)
  const handleDurationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (!selectedStockId) return; // Ensure stock is selected before querying

    const duration = event.target.value;
    dispatch(setSelectedDuration(duration));

    // Fire API request only when stockId and duration are valid
    dispatch(fetchStockData({ stockId: selectedStockId, duration }));
  };

  // Find the selected stock object to get its available durations
  const selectedStock = stocks.find((stock) => stock.id === selectedStockId);

  return (
    <div>
      <h2>Select a Stock</h2>
      <select onChange={handleStockChange} value={selectedStockId || ""}>
        <option value="" disabled>
          Select a stock
        </option>
        {stocks.map((stock) => (
          <option key={stock.id} value={stock.id}>
            {stock.name} ({stock.symbol})
          </option>
        ))}
      </select>

      {selectedStock && (
        <>
          <h2>Select Duration</h2>
          <select
            onChange={handleDurationChange}
            value={selectedDuration || ""}
          >
            <option value="" disabled>
              Select duration
            </option>
            {selectedStock.available.map((duration) => (
              <option key={duration} value={duration}>
                {duration}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default StockSelector;
