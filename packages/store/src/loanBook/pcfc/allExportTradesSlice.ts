import { createSlice } from "@reduxjs/toolkit";

const filters_initial_state = {
	maturity_months: "",
	bank_name: "",
};
export const allExportTradesSlice = createSlice({
	name: "allExportTradesSlice",
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
		setTradeSort: (state, action) => {
			state.sort = { ...state.sort, ...action.payload };
		},

		setTradeFilters: (state, action) => {
			state.filter = { ...state.filter, ...action.payload };
		},
		setTradeStatus: (state, action) => {
			state.status = { ...state.status, ...action.payload };
		},

		setTradeFiltersInitialState: (state, action) => {
			state.filter = filters_initial_state;
		},

		clearTradeSort: (state) => {
			state.sort = {
				sort_by: "",
				order_by: "",
				value: "",
			};
		},
		clearTradeFilters: (state) => {
			state.filter = filters_initial_state;
		},
		clearTradeStatus: (state) => {
			state.status = { label: "active", value: 1 };
		},
		clearAllTradeFilter: (state) => {
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
	setTradeSort,
	setTradeFilters,
	setTradeStatus,
	clearTradeSort,
	clearTradeFilters,
	clearTradeStatus,
	clearAllTradeFilter,
	setTradeFiltersInitialState,
} = allExportTradesSlice.actions;

export default allExportTradesSlice.reducer;
