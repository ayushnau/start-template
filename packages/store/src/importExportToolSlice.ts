import { createSlice } from "@reduxjs/toolkit";

export const importExportToolSlice = createSlice({
	name: "importExportTool",
	initialState: {
		currency_pair: "",
		forecast_rate: "",
		selectedMonths: [],
		selectedMonthsWithAmount: [],
		calculatedValues: {},
		total_amount: "",
	},

	reducers: {
		setImportExportCurrencyPair: (state, action) => {
			state.currency_pair = action.payload;
		},
		setImportExportForecastRate: (state, action) => {
			state.forecast_rate = action.payload;
		},
		setImportExportSelectedMonths: (state, action) => {
			state.selectedMonths = action.payload;
		},
		setImportExportSelectedMonthsWithAmount: (state, action) => {
			state.selectedMonthsWithAmount = action.payload;
		},
		setImportExportTotalAmount: (state, action) => {
			state.total_amount = action.payload;
		},
		setImportExportCalculatedValues: (state, action) => {
			state.calculatedValues = action.payload;
		},

		clearImportExportCurrencyPair: (state) => {
			state.currency_pair = "";
		},
		clearImportExportForecastRate: (state) => {
			state.forecast_rate = "";
		},
		clearImportExportSelectedMonths: (state) => {
			state.selectedMonths = [];
		},
		clearImportExportSelectedMonthsWithAmount: (state) => {
			state.selectedMonthsWithAmount = [];
		},
		clearImportExportTotalAmount: (state) => {
			state.total_amount = "";
		},
		clearImportExportCalculatedValues: (state) => {
			state.calculatedValues = {};
		},

		clearImportExportForm: (state) => {
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
	setImportExportCurrencyPair,
	setImportExportForecastRate,
	setImportExportSelectedMonths,
	setImportExportSelectedMonthsWithAmount,
	setImportExportTotalAmount,
	setImportExportCalculatedValues,
	clearImportExportCurrencyPair,
	clearImportExportForecastRate,
	clearImportExportSelectedMonths,
	clearImportExportSelectedMonthsWithAmount,
	clearImportExportTotalAmount,
	clearImportExportCalculatedValues,
	clearImportExportForm,
} = importExportToolSlice.actions;

export default importExportToolSlice.reducer;
