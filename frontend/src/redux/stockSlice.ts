import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface StockState {
  stocks: any[];
  selectedStockId: string | null;
  selectedDuration: string | null;
  stockData: any[];
  loading: boolean;
}

const initialState: StockState = {
  stocks: [],
  selectedStockId: null,
  selectedDuration: null,
  stockData: [],
  loading: false,
};

// Fetch available stocks
export const fetchStocks = createAsyncThunk("stocks/fetchStocks", async () => {
  const response = await axios.get("http://localhost:3000/api/stocks");
  return response.data;
});

// Fetch stock data based on stock ID and duration
export const fetchStockData = createAsyncThunk(
  "stocks/fetchStockData",
  async ({ stockId, duration }: { stockId: string; duration: string }) => {
    const response = await axios.post(
      `http://localhost:3000/api/stocks/${stockId}`,
      { duration }
    );
    return response.data;
  }
);

const stockSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    setSelectedStock: (state, action) => {
      state.selectedStockId = action.payload;
      state.selectedDuration = null; // Reset duration when a new stock is selected
      state.stockData = []; // Clear previous stock data
    },
    setSelectedDuration: (state, action) => {
      state.selectedDuration = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.stocks = action.payload;
      })
      .addCase(fetchStockData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.stockData = action.payload.data;
        state.loading = false;
      });
  },
});

export const { setSelectedStock, setSelectedDuration } = stockSlice.actions;
export default stockSlice.reducer;
