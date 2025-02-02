import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StockChart = () => {
  const { stockData, loading } = useSelector(
    (state: RootState) => state.stocks
  );

  const memoizedData = useMemo(() => stockData, [stockData]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-150">
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!memoizedData || memoizedData.length === 0)
    return (
      <p className="flex justify-center font-semibold text-2xl mt-10 h-150">
        Select a stock and duration & wait a moment to view the chart
      </p>
    );

  return (
    <ResponsiveContainer width="100%" height={600}>
      <LineChart data={memoizedData}>
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#493657"
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
