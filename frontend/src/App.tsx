import { Provider } from "react-redux";
import { store } from "./redux/store";
import StockChart from "./components/StockChart";
import StockSelector from "./components/StockSelector";
import StockDataFetcher from "./components/StockDataFetcher";

function App() {
  return (
    <Provider store={store}>
      <div className="">
        <h1 className="flex justify-center mt-6 text-3xl font-semibold text-[#34D1BF]">
          Stock Market Dashboard
        </h1>
        <div className="p-10">
          <StockDataFetcher />
          <StockSelector />
          <div className="bg-[#EFEFEF] rounded-b-lg mx-auto py-5 shadow-xl">
            <StockChart />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;

