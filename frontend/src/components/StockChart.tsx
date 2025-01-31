import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const StockChart = () => {
  const { stockData, loading } = useSelector((state: RootState) => state.stocks);

  if (loading) return <p>Loading chart data...</p>;
  if (!stockData || stockData.length === 0) return <p>Select a stock and duration to view the chart</p>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={stockData}>
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
