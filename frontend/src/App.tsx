import { Provider } from "react-redux";
import { store } from "./redux/store";
import StockDropdown from "./components/StockDropdown";
import StockChart from "./components/StockChart";

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>Stock Market Dashboard</h1>
        <StockDropdown />
        <StockChart />
      </div>
    </Provider>
  );
}

export default App;

