import { createSlice } from "@reduxjs/toolkit";

export const ledgerSlice = createSlice({
	name: "login",
	initialState: {
		ledger: {
			id: "",
		},
	},

	reducers: {
		setLedgerId: (state, action) => {
			state.ledger = { ...state.ledger, ...action.payload };
		},
		clearLedgerId: (state) => {
			state.ledger = {
				id: "",
			};
		},
	},
});

export const { setLedgerId, clearLedgerId } = ledgerSlice.actions;

export default ledgerSlice.reducer;
