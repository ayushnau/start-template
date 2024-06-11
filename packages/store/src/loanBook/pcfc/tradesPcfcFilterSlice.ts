import { createSlice } from "@reduxjs/toolkit";

const filters_initial_state = {
	maturity_months: "",
	bank_name: "",
	ledger_list: "1000000000",
};
export const tradesPcfcFilterSlice = createSlice({
	name: "tradesPcfcFilterSlice",
	initialState: {
		sort: {
			sort_by: "",
			order_by: "",
			value: "",
		},
		filter: filters_initial_state,
		status: { label: "active", value: 1 },
	},

	reducers: {
		setTradePcfcSort: (state, action) => {
			state.sort = { ...state.sort, ...action.payload };
		},

		setTradePcfcFilters: (state, action) => {
			state.filter = { ...state.filter, ...action.payload };
		},
		setTradePcfcStatus: (state, action) => {
			state.status = { ...state.status, ...action.payload };
		},

		setTradePcfcFiltersInitialState: (state, action) => {
			state.filter = filters_initial_state;
		},

		clearTradePcfcSort: (state) => {
			state.sort = {
				sort_by: "",
				order_by: "",
				value: "",
			};
		},
		clearTradePcfcFilters: (state) => {
			state.filter = filters_initial_state;
		},
		clearTradePcfcStatus: (state) => {
			state.status = { label: "active", value: 1 };
		},
		clearAllTradePcfcFilter: (state) => {
			state.sort = {
				sort_by: "",
				order_by: "",
				value: "",
			};
			state.filter = filters_initial_state;
			state.status = { label: "active", value: 1 };
		},
	},
});

export const {
	setTradePcfcSort,
	setTradePcfcFilters,
	setTradePcfcStatus,
	clearTradePcfcSort,
	clearTradePcfcFilters,
	clearTradePcfcStatus,
	clearAllTradePcfcFilter,
	setTradePcfcFiltersInitialState,
} = tradesPcfcFilterSlice.actions;

export default tradesPcfcFilterSlice.reducer;
