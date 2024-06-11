import { createSlice } from "@reduxjs/toolkit";

export const ratesSlice = createSlice({
	name: "rates",
	initialState: {
		rates: {},
	},

	reducers: {
		setRates: (state, action) => {
			state.rates = { ...state.rates, ...action.payload };
		},
		clearRates: (state) => {
			state.rates = {};
		},
	},
});

export const { setRates, clearRates } = ratesSlice.actions;

export default ratesSlice.reducer;
