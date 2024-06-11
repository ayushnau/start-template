import { createSlice } from "@reduxjs/toolkit";

export const forexEntityCountSlice = createSlice({
	name: "forexEntityCount",
	initialState: {
		ledgerCount: 0,
		tradeCount: 0,
		hedgeCount: 0,
		eefcCount: 0,
	},

	reducers: {
		setLedgerCount: (state, action) => {
			state.ledgerCount = action.payload;
		},
		setTradeCount: (state, action) => {
			state.tradeCount = action.payload;
		},
		setHedgeCount: (state, action) => {
			state.hedgeCount = action.payload;
		},
		setEefcCount: (state, action) => {
			state.eefcCount = action.payload;
		},
		clearAllEntityCount: (state) => {
			state = {
				ledgerCount: 0,
				tradeCount: 0,
				hedgeCount: 0,
				eefcCount: 0,
			};
		},
	},
});

export const {
	setLedgerCount,
	setTradeCount,
	setHedgeCount,
	clearAllEntityCount,
	setEefcCount,
} = forexEntityCountSlice.actions;

export default forexEntityCountSlice.reducer;
