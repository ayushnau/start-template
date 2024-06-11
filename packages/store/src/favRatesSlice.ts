import { createSlice } from "@reduxjs/toolkit";

export const favRatesSlice = createSlice({
	name: "fav-rates",
	initialState: {
		favRates: [] as any[],
	},

	reducers: {
		setFavRates: (state, action) => {
			state.favRates = [...action.payload];
		},
		clearFavRates: (state) => {
			state.favRates = [];
		},
	},
});

export const { setFavRates, clearFavRates } = favRatesSlice.actions;

export default favRatesSlice.reducer;
