import { createSlice } from "@reduxjs/toolkit";

export const transactionEefcFilterSlice = createSlice({
	name: "transactionEefcFilter",
	initialState: {
		filterTypeEefc: "",
	},

	reducers: {
		setTransactionEefcFilter: (state, action) => {
			state.filterTypeEefc = action.payload;
		},

		clearTransactionEefcFilter: (state) => {
			state.filterTypeEefc = "";
		},
	},
});

export const { clearTransactionEefcFilter, setTransactionEefcFilter } =
	transactionEefcFilterSlice.actions;

export default transactionEefcFilterSlice.reducer;
