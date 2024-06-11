import { createSlice } from "@reduxjs/toolkit";

export const portfolioAllTradesAllLedgersListSlice = createSlice({
	name: "portfolioAllTradesAllLedgerList",
	initialState: {
		tradeList: {},
        tradesRefresh:"",
	},

	reducers: {
		setPortfolioAllTradesList: (state: any, action) => {
			state.tradeList = action.payload;
		},

		setPortfolioAllTradesAllLedgers: (state: any, action) => {
			state.tradesRefresh = action.payload;
		},

		updatePortfolioAllTradeSpecificRecord: (state: any, action: any) => {
			const data = action.payload;
			state.tradeList[data.uuid] = data;
		},

		clearAllPortfolioAllTradesList: (state: any) => {
			state.tradeList = {};
            state.tradesRefresh="";
		},
	},
});

export const {
	setPortfolioAllTradesList,
    setPortfolioAllTradesAllLedgers,
	updatePortfolioAllTradeSpecificRecord,
	clearAllPortfolioAllTradesList,
} = portfolioAllTradesAllLedgersListSlice.actions;

export default portfolioAllTradesAllLedgersListSlice.reducer;
