import { createSlice } from "@reduxjs/toolkit";

export const transactionFilterSlice = createSlice({
	name: "transactionFilter",
	initialState: {
		filterTypeTrade: "",
		filterTypeHedge: "",
	},

	reducers: {
		setTransactionFilterTrade: (state, action) => {
			state.filterTypeTrade = action.payload;
		},

		setTransactionFilterHedge: (state, action) => {
			state.filterTypeHedge = action.payload;
		},

		clearTransactionFilterTrade: (state) => {
			state.filterTypeTrade = "";
		},

		clearTransactionFilterHedge: (state) => {
			state.filterTypeHedge = "";
		},
	},
});

export const {
	setTransactionFilterTrade,
	setTransactionFilterHedge,
	clearTransactionFilterTrade,
	clearTransactionFilterHedge,
} = transactionFilterSlice.actions;

export default transactionFilterSlice.reducer;
