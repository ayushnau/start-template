import { createSlice } from "@reduxjs/toolkit";

export const importToolSlice = createSlice({
	name: "importTool",
	initialState: {
		currency_pair: "",
		forecast_rate: "",
		selectedMonths: [],
		selectedMonthsWithAmount: [],
		calculatedValues: {},
		total_amount: "",
	},

	reducers: {
		setImportCurrencyPair: (state, action) => {
			state.currency_pair = action.payload;
		},
		setImportForecastRate: (state, action) => {
			state.forecast_rate = action.payload;
		},
		setImportSelectedMonths: (state, action) => {
			state.selectedMonths = action.payload;
		},
		setImportSelectedMonthsWithAmount: (state, action) => {
			state.selectedMonthsWithAmount = action.payload;
		},
		setImportTotalAmount: (state, action) => {
			state.total_amount = action.payload;
		},
		setImportCalculatedValues: (state, action) => {
			state.calculatedValues = action.payload;
		},

		clearImportCurrencyPair: (state) => {
			state.currency_pair = "";
		},
		clearImportForecastRate: (state) => {
			state.forecast_rate = "";
		},
		clearImportSelectedMonths: (state) => {
			state.selectedMonths = [];
		},
		clearImportSelectedMonthsWithAmount: (state) => {
			state.selectedMonthsWithAmount = [];
		},
		clearImportTotalAmount: (state) => {
			state.total_amount = "";
		},
		clearImportCalculatedValues: (state) => {
			state.calculatedValues = {};
		},

		clearImportForm: (state) => {
			state.currency_pair = "";
			state.forecast_rate = "";
			state.selectedMonths = [];
			state.selectedMonthsWithAmount = [];
			state.calculatedValues = {};
			state.total_amount = "";
		},
	},
});

export const {
	setImportCurrencyPair,
	setImportForecastRate,
	setImportSelectedMonths,
	setImportSelectedMonthsWithAmount,
	setImportTotalAmount,
	setImportCalculatedValues,
	clearImportCurrencyPair,
	clearImportForecastRate,
	clearImportSelectedMonths,
	clearImportSelectedMonthsWithAmount,
	clearImportTotalAmount,
	clearImportCalculatedValues,
	clearImportForm,
} = importToolSlice.actions;

export default importToolSlice.reducer;
