import { createSlice } from "@reduxjs/toolkit";

export const portfolioSelectedTabSlice = createSlice({
	name: "portfolioSelectedTab",
	initialState: {
		selectedTab: "",
		updated_at: "",
	},

	reducers: {
		setPortfolioSelectedTab: (state, action) => {
			state.selectedTab = action.payload;
		},
		setPortfolioUpdatedAtTime: (state, action) => {
			state.updated_at = action.payload;
		},

		clearPortfolioSelectedTab: (state) => {
			state.selectedTab = "";
		},
		clearPortfolioUpdatedAtTime: (state) => {
			state.updated_at = "";
		},
	},
});

export const {
	setPortfolioSelectedTab,
	setPortfolioUpdatedAtTime,
	clearPortfolioSelectedTab,
	clearPortfolioUpdatedAtTime,
} = portfolioSelectedTabSlice.actions;

export default portfolioSelectedTabSlice.reducer;
