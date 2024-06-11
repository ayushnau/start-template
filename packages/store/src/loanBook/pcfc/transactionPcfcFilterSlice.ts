import { createSlice } from "@reduxjs/toolkit";

export const transactionPcfcFilterSlice = createSlice({
	name: "transactionPcfcFilter",
	initialState: {
		filterTypePcfc: "",
	},

	reducers: {
		setTransactionPcfcFilter: (state, action) => {
			state.filterTypePcfc = action.payload;
		},

		clearTransactionPcfcFilter: (state) => {
			state.filterTypePcfc = "";
		},
	},
});

export const { clearTransactionPcfcFilter, setTransactionPcfcFilter } =
	transactionPcfcFilterSlice.actions;

export default transactionPcfcFilterSlice.reducer;
