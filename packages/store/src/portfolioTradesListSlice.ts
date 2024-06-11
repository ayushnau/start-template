import { createSlice } from "@reduxjs/toolkit";

export const portfolioTradesListSlice = createSlice({
	name: "portfolioTradesList",
	initialState: {
		tradeList: {},
	},

	reducers: {
		setPortfolioTradesList: (state: any, action) => {
			state.tradeList = action.payload;
		},

		updatePortfolioTradeSpecificRecord: (state: any, action: any) => {
			const data = action.payload;
			state.tradeList[data.uuid] = data;
		},

		clearAllPortfolioTradesList: (state: any) => {
			state.tradeList = {};
		},
	},
});

export const {
	setPortfolioTradesList,
	clearAllPortfolioTradesList,
	updatePortfolioTradeSpecificRecord,
} = portfolioTradesListSlice.actions;

export default portfolioTradesListSlice.reducer;
