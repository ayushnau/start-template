import { createSlice } from "@reduxjs/toolkit";

export const portfolioHedgesListSlice = createSlice({
	name: "portfolioHedgesList",
	initialState: {
		hedgeList: {},
	},

	reducers: {
		setPortfolioHedgesList: (state: any, action) => {
			state.hedgeList = action.payload;
		},

		updatePortfolioHedgeSpecificRecord: (state: any, action: any) => {
			const data = action.payload;
			state.hedgeList[data.uuid] = data;
		},

		clearAllPortfolioHedgesList: (state: any) => {
			state.hedgeList = {};
		},
	},
});

export const {
	setPortfolioHedgesList,
	clearAllPortfolioHedgesList,
	updatePortfolioHedgeSpecificRecord,
} = portfolioHedgesListSlice.actions;

export default portfolioHedgesListSlice.reducer;
