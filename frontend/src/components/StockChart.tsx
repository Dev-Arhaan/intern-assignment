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

  if (loading)
    return (
      <div className="flex items-center justify-center h-20">
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  if (!stockData || stockData.length === 0)
    return (
      <p className="flex justify-center font-semibold text-2xl mt-10">
        Select a stock and duration to view the chart
      </p>
    );

  return (
    <ResponsiveContainer width="95%" height={600} className={`bg-[#ECE7DE] rounded-lg my-10 mx-auto py-5 shadow-xl`}>
      <LineChart data={stockData}>
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#493657" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
