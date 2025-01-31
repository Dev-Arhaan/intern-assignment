import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStocks,
  fetchStockData,
  setSelectedStock,
} from "../redux/stockSlice";
import { RootState, AppDispatch } from "../redux/store";

const StockDropdown = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { stocks, selectedStockId } = useSelector(
    (state: RootState) => state.stocks
  );

  // Local state to manage selected duration
  const [selectedDuration, setSelectedDuration] = useState("");

  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  const handleStockSelect = (stockId: string) => {
    const selectedStock = stocks.find((stock) => stock.id === stockId);
    if (!selectedStock) return;

    const initialDuration = selectedStock.available[0]; // Set first available duration by default
    setSelectedDuration(initialDuration);

    dispatch(setSelectedStock(stockId));
    dispatch(fetchStockData({ stockId, duration: initialDuration }));
  };

  const handleDurationSelect = (duration: string) => {
    if (!selectedStockId) return;

    setSelectedDuration(duration);
    dispatch(fetchStockData({ stockId: selectedStockId, duration }));
  };

  return (
    <div>
      <h2>Select a Stock</h2>
      {/* Stock Dropdown */}
      <select
        onChange={(e) => handleStockSelect(e.target.value)}
        value={selectedStockId || ""}
      >
        <option value="">Select a stock</option>
        {stocks.map((stock) => (
          <option key={stock.id} value={stock.id}>
            {stock.name} ({stock.symbol}) - Available:{" "}
            {stock.available.join(", ")}
          </option>
        ))}
      </select>

      {/* Duration Dropdown (Only Show if a Stock is Selected) */}
      {selectedStockId && (
        <div>
          <h3>Select Duration</h3>
          <select
            onChange={(e) => handleDurationSelect(e.target.value)}
            value={selectedDuration}
          >
            {stocks
              .find((stock) => stock.id === selectedStockId)
              ?.available.map((duration) => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default StockDropdown;
