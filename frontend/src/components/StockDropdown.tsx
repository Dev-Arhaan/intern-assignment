import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks, fetchStockData, setSelectedStock } from "../redux/slices/stockSlice";
import { RootState, AppDispatch } from "../redux/store";

const StockDropdown = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { stocks, selectedStockId } = useSelector((state: RootState) => state.stocks);

  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  const handleStockSelect = (stockId: string) => {
    dispatch(setSelectedStock(stockId));
    dispatch(fetchStockData(stockId));
  };

  return (
    <div>
      <h2>Select a Stock</h2>
      <select onChange={(e) => handleStockSelect(e.target.value)} value={selectedStockId || ""}>
        <option value="">Select a stock</option>
        {stocks.map((stock) => (
          <option key={stock.id} value={stock.id}>
            {stock.name} ({stock.symbol}) - Available: {stock.available.join(", ")}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StockDropdown;
