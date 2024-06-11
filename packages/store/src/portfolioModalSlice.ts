import { createSlice } from "@reduxjs/toolkit";

export const portfolioModalSlice = createSlice({
	name: "portfolioModal",
	initialState: {
		displayModalScreen: false,
		modalScreen: "",
	},

	reducers: {
		setPortfolioModal: (state, action) => {
			state.displayModalScreen = action.payload?.displayModalScreen;
			state.modalScreen = action.payload?.modalScreen || "";
		},

		clearPortfolioModal: (state) => {
			state.displayModalScreen = false;
			state.modalScreen = "";
		},
	},
});

export const { setPortfolioModal, clearPortfolioModal } =
	portfolioModalSlice.actions;

export default portfolioModalSlice.reducer;
