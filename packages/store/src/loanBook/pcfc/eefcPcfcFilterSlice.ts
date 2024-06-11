import { createSlice } from "@reduxjs/toolkit";

const filters_initial_state = {
	maturity_months: "",
	bank_name: "",
};
export const eefcPcfcFilterSlice = createSlice({
	name: "eefcPcfcFilterSlice",
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
		setEefcPcfcSort: (state, action) => {
			state.sort = { ...state.sort, ...action.payload };
		},

		setEefcPcfcFilters: (state, action) => {
			state.filter = { ...state.filter, ...action.payload };
		},
		setEefcPcfcStatus: (state, action) => {
			state.status = { ...state.status, ...action.payload };
		},

		setEefcPcfcFiltersInitialState: (state, action) => {
			state.filter = filters_initial_state;
		},

		clearEefcPcfcSort: (state) => {
			state.sort = {
				sort_by: "",
				order_by: "",
				value: "",
			};
		},
		clearEefcPcfcFilters: (state) => {
			state.filter = filters_initial_state;
		},
		clearEefcPcfcStatus: (state) => {
			state.status = { label: "active", value: 1 };
		},
		clearAllEefcPcfcFilter: (state) => {
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
	setEefcPcfcSort,
	setEefcPcfcFilters,
	setEefcPcfcStatus,
	clearEefcPcfcSort,
	clearEefcPcfcFilters,
	clearEefcPcfcStatus,
	clearAllEefcPcfcFilter,
	setEefcPcfcFiltersInitialState,
} = eefcPcfcFilterSlice.actions;

export default eefcPcfcFilterSlice.reducer;
