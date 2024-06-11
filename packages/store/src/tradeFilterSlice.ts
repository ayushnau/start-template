import { createSlice } from "@reduxjs/toolkit";

const filters_initial_state = {
	currency_pairs: "",
	trade_type: "",
	risk_or_gain: "",
	maturity_months: "",
	risk_coverage: "",
	bank_names: "",
};
export const tradeFilterSlice = createSlice({
	name: "login",
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
		setTradesSort: (state, action) => {
			state.sort = { ...state.sort, ...action.payload };
		},

		setTradesFilters: (state, action) => {
			state.filter = { ...state.filter, ...action.payload };
		},
		setTradesStatus: (state, action) => {
			state.status = { ...state.status, ...action.payload };
		},

		setTradesFiltersInitialState: (state, action) => {
			if (!Object.keys(action).includes("bank_names")) {
				state.filter = filters_initial_state;
			}
		},

		clearTradesSort: (state) => {
			state.sort = {
				sort_by: "",
				order_by: "",
				value: "",
			};
		},
		clearTradesFilters: (state) => {
			state.filter = filters_initial_state;
		},
		clearTradesStatus: (state) => {
			state.status = { label: "active", value: 1 };
		},
		clearAllTradesFilter: (state) => {
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
	setTradesSort,
	setTradesFilters,
	setTradesStatus,
	clearTradesSort,
	clearTradesFilters,
	clearTradesStatus,
	clearAllTradesFilter,
	setTradesFiltersInitialState,
} = tradeFilterSlice.actions;

export default tradeFilterSlice.reducer;
