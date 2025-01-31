import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface StockMeta {
  id: string;
  name: string;
  symbol: string;
  available: string[];
}

interface StockState {
  stocks: StockMeta[];
  selectedStockId: string | null;
  stockData: any[];
  loading: boolean;
}

const initialState: StockState = {
  stocks: [],
  selectedStockId: null,
  stockData: [],
  loading: false,
};

// Fetch stock metadata
export const fetchStocks = createAsyncThunk("stocks/fetchStocks", async () => {
  const response = await fetch("http://localhost:3000/api/stocks");
  return response.json();
});

// Fetch stock data based on selected stock
export const fetchStockData = createAsyncThunk(
  "stocks/fetchStockData",
  async (stockId: string) => {
    const response = await fetch(`http://localhost:3000/api/stocks/${stockId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ duration: "1y" }),
    });
    return response.json();
  }
);

const stockSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    setSelectedStock: (state, action) => {
      state.selectedStockId = action.payload;
    }
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
  }
});

export const { setSelectedStock } = stockSlice.actions;
export default stockSlice.reducer;
