import { createSlice } from "@reduxjs/toolkit";

const filters_initial_state = {
	maturity_months: "",
	bank_name: "",
};
export const pcfcFilterSlice = createSlice({
	name: "pcfcFilterSlice",
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
		setPcfcSort: (state, action) => {
			state.sort = { ...state.sort, ...action.payload };
		},

		setPcfcFilters: (state, action) => {
			state.filter = { ...state.filter, ...action.payload };
		},
		setPcfcStatus: (state, action) => {
			state.status = { ...state.status, ...action.payload };
		},

		setPcfcFiltersInitialState: (state, action) => {
			state.filter = filters_initial_state;
		},

		clearPcfcSort: (state) => {
			state.sort = {
				sort_by: "",
				order_by: "",
				value: "",
			};
		},
		clearPcfcFilters: (state) => {
			state.filter = filters_initial_state;
		},
		clearPcfcStatus: (state) => {
			state.status = { label: "active", value: 1 };
		},
		clearAllPcfcFilter: (state) => {
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
	setPcfcSort,
	setPcfcFilters,
	setPcfcStatus,
	clearPcfcSort,
	clearPcfcFilters,
	clearPcfcStatus,
	clearAllPcfcFilter,
	setPcfcFiltersInitialState,
} = pcfcFilterSlice.actions;

export default pcfcFilterSlice.reducer;
