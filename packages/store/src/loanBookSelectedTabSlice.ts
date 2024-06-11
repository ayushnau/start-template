import { createSlice } from "@reduxjs/toolkit";

export const LoanBookSelectedTabSlice = createSlice({
	name: "loanBookSelectedTab",
	initialState: {
		selectedTab: "",
	},

	reducers: {
		setLoanBookSelectedTab: (state, action) => {
			state.selectedTab = action.payload;
		},


		clearLoanBookSelectedTab: (state) => {
			state.selectedTab = "";
		},
		
	},
});

export const {
	setLoanBookSelectedTab,
	clearLoanBookSelectedTab,
} = LoanBookSelectedTabSlice.actions;

export default LoanBookSelectedTabSlice.reducer;
