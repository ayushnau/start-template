import { createSlice } from "@reduxjs/toolkit";

export const linkableHedgesFilterSlice = createSlice({
	name: "linkableHedges",
	initialState: {
		sort: {
			sort_by: "",
			order_by: "",
			value: "",
		},
		filter: {
			maturity_months: "",
		},
	},

	reducers: {
		setLinkableHedgesSort: (state, action) => {
			state.sort = { ...state.sort, ...action.payload };
		},

		setLinkableHedgesFilters: (state, action) => {
			state.filter = { ...state.filter, ...action.payload };
		},

		clearLinkableHedgesSort: (state) => {
			state.sort = {
				sort_by: "",
				order_by: "",
				value: "",
			};
		},
		clearLinkableHedgesFilters: (state) => {
			state.filter = {
				maturity_months: "",
			};
		},

		clearAllLinkableHedgesFilter: (state) => {
			state.sort = {
				sort_by: "",
				order_by: "",
				value: "",
			};
			state.filter = {
				maturity_months: "",
			};
		},
	},
});

export const {
	setLinkableHedgesSort,
	setLinkableHedgesFilters,
	clearLinkableHedgesSort,
	clearLinkableHedgesFilters,
	clearAllLinkableHedgesFilter,
} = linkableHedgesFilterSlice.actions;

export default linkableHedgesFilterSlice.reducer;
