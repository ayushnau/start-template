import { createSlice } from "@reduxjs/toolkit";

export const ledgerInfoSlice = createSlice({
	name: "ledgerInfo",
	initialState: {
		ledgerDetails: {},
		currentSelectedLedgerId: "",
	},

	reducers: {
		setCurrentSelectedLedgerId: (state: any, action) => {
			state.currentSelectedLedgerId = action.payload;
		},
		setLedgerDetails: (state, action) => {
			state.ledgerDetails = action.payload;
		},

		clearLedgerDetails: (state) => {
			state.ledgerDetails = "";
		},
	},
});

export const {
	setLedgerDetails,
	clearLedgerDetails,
	setCurrentSelectedLedgerId,
} = ledgerInfoSlice.actions;

export default ledgerInfoSlice.reducer;
