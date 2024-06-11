import { createSlice } from "@reduxjs/toolkit";

export const portfolioEEFCsSlice = createSlice({
	name: "portfolioEEFCs",
	initialState: {
		eefcsRefresh: "",
	},

	reducers: {
		setPortfolioEEFCs: (state, action) => {
			state.eefcsRefresh = action.payload;
		},
		clearPortfolioEEFcs: (state) => {
			state.eefcsRefresh = "";
		},
	},
});

export const { clearPortfolioEEFcs, setPortfolioEEFCs } =
	portfolioEEFCsSlice.actions;

export default portfolioEEFCsSlice.reducer;
