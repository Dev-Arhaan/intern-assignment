import { Provider } from "react-redux";
import { store } from "./redux/store";
import StockChart from "./components/StockChart";
import StockSelector from "./components/StockSelector";


function App() {
  return (
    <Provider store={store}>
      <div className="mt-10">
        {/* <h1 className="flex justify-center m-10 text-2xl font-semibold">Stock Market Dashboard</h1> */}
        <StockSelector />
        <StockChart />
      </div>
    </Provider>
  );
}

export default App;

