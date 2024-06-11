import { createSlice } from "@reduxjs/toolkit";

const filters_initial_state = {
	currency_pairs: "",
	hedge_type: "",
	risk_or_gain: "",
	maturity_months: "",
	bank_names: "",
};

export const hedgeFilterSlice = createSlice({
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
		setHedgesSort: (state, action) => {
			state.sort = { ...state.sort, ...action.payload };
		},

		setHedgesFilters: (state, action) => {
			state.filter = { ...state.filter, ...action.payload };
		},
		setHedgesStatus: (state, action) => {
			state.status = { ...state.status, ...action.payload };
		},
		setHedgesInitialState: (state, action) => {
			if (!Object.keys(action).includes("bank_names")) {
				state.filter = filters_initial_state;
			}
		},

		clearHedgesSort: (state) => {
			state.sort = {
				sort_by: "",
				order_by: "",
				value: "",
			};
		},
		clearHedgesFilters: (state) => {
			state.filter = filters_initial_state;
		},
		clearHedgesStatus: (state) => {
			state.status = { label: "active", value: 1 };
		},
		clearAllHedgesFilter: (state) => {
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
	setHedgesSort,
	setHedgesFilters,
	setHedgesStatus,
	clearHedgesSort,
	clearHedgesFilters,
	clearHedgesStatus,
	clearAllHedgesFilter,
	setHedgesInitialState,
} = hedgeFilterSlice.actions;

export default hedgeFilterSlice.reducer;
