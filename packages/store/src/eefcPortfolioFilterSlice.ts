import { createSlice } from "@reduxjs/toolkit";

const filters_initial_state = {
	currency_pairs: "",
	eefc_type: "",
	risk_or_gain: "",
	maturity_months: "",
	credit_months: "",
	bank_names: "",
};

export const eefcFilterSlice = createSlice({
	name: "eefcFilterSlice",
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
		setEEFCSort: (state, action) => {
			state.sort = { ...state.sort, ...action.payload };
		},

		setEEFCFilters: (state, action) => {
			state.filter = { ...state.filter, ...action.payload };
		},
		setEEFCStatus: (state, action) => {
			state.status = { ...state.status, ...action.payload };
		},
		setEEFCInitialState: (state, action) => {
			state.filter = filters_initial_state;
		},

		clearEEFCSort: (state) => {
			state.sort = {
				sort_by: "",
				order_by: "",
				value: "",
			};
		},
		clearEEFCFilters: (state) => {
			state.filter = filters_initial_state;
		},
		clearEEFCStatus: (state) => {
			state.status = { label: "active", value: 1 };
		},
		clearAllEEFCFilter: (state) => {
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
	setEEFCSort,
	setEEFCFilters,
	setEEFCStatus,
	clearEEFCSort,
	clearEEFCFilters,
	clearEEFCStatus,
	clearAllEEFCFilter,
	setEEFCInitialState,
} = eefcFilterSlice.actions;

export default eefcFilterSlice.reducer;
