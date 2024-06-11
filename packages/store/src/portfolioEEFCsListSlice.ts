import { createSlice } from "@reduxjs/toolkit";

export const portfolioEEFCsListSlice = createSlice({
	name: "portfolioEEFCsList",
	initialState: {
		eefcList: {},
		eefcsRefresh: "",
	},

	reducers: {
		setPortfolioEEFCsList: (state: any, action) => {
			state.eefcList = action.payload;
		},
		setPortfolioEEFCs: (state: any, action) => {
			state.eefcsRefresh = action.payload;
		},
		updatePortfolioEEFCSpecificRecord: (state: any, action: any) => {
			const data = action.payload;
			state.eefcList[data.uuid] = data;
		},

		clearAllPortfolioEEFCsList: (state: any) => {
			state.eefcList = {};
		},
	},
});

export const {
	setPortfolioEEFCs,
	setPortfolioEEFCsList,
	clearAllPortfolioEEFCsList,
	updatePortfolioEEFCSpecificRecord,
} = portfolioEEFCsListSlice.actions;

export default portfolioEEFCsListSlice.reducer;
