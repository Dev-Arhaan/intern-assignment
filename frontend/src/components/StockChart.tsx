import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const StockChart = () => {
  const { stockData, loading } = useSelector((state: RootState) => state.stocks);

  // Ensure stockData is always an array
  const data = stockData || [];

  if (loading) return <p>Loading chart data...</p>;
  if (data.length === 0) return <p>Select a stock to view the chart</p>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;