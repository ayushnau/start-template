import { createSlice } from "@reduxjs/toolkit";

export const portfolioTradesHedgesSlice = createSlice({
	name: "portfolioTradesHedges",
	initialState: {
		tradesRefresh: "",
		hedgesRefresh: "",
		ledgersRefresh: "",
	},

	reducers: {
		setPortfolioTrades: (state, action) => {
			state.tradesRefresh = action.payload;
		},
		setPortfolioHedges: (state, action) => {
			state.hedgesRefresh = action.payload;
		},
		setPortfolioLedgers: (state, action) => {
			state.ledgersRefresh = action.payload;
		},

		clearPortfolioTrades: (state) => {
			state.tradesRefresh = "";
		},
		clearPortfolioHedges: (state) => {
			state.hedgesRefresh = "";
		},
		clearPortfolioLedgers: (state) => {
			state.ledgersRefresh = "";
		},
		clearAllPrtfolioTradesAndHedges: (state) => {
			state.tradesRefresh = "";
			state.hedgesRefresh = "";
			state.ledgersRefresh = "";
		},
	},
});

export const {
	setPortfolioTrades,
	setPortfolioHedges,
	setPortfolioLedgers,
	clearPortfolioTrades,
	clearPortfolioHedges,
	clearPortfolioLedgers,
	clearAllPrtfolioTradesAndHedges,
} = portfolioTradesHedgesSlice.actions;

export default portfolioTradesHedgesSlice.reducer;
