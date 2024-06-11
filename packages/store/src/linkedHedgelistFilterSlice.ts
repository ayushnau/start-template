import { createSlice } from "@reduxjs/toolkit";

const filters_initial_state = {
	risk_or_gain: "",
	maturity_months: "",
	bank_names: "",
};

export const linkedHedgelistFilterSlice = createSlice({
	name: "linkedHedgelistFilterSlice",
	initialState: {
		sort: {
			sort_by: "",
			order_by: "",
			value: "",
		},
		filter: filters_initial_state,
	},

	reducers: {
		setLinkedHedgesSort: (state, action) => {
			state.sort = { ...state.sort, ...action.payload };
		},

		setLinkedHedgesFilters: (state, action) => {
			state.filter = { ...state.filter, ...action.payload };
		},

		setLinkedHedgesInitialState: (state, action) => {
			state.filter = filters_initial_state;
		},

		clearLinkedHedgesSort: (state) => {
			state.sort = {
				sort_by: "",
				order_by: "",
				value: "",
			};
		},
		clearLinkedHedgesFilters: (state) => {
			state.filter = filters_initial_state;
		},

		clearAllLinkedHedgesFilter: (state) => {
			state.sort = {
				sort_by: "",
				order_by: "",
				value: "",
			};
			state.filter = filters_initial_state;
		},
	},
});

export const {
	setLinkedHedgesSort,
	setLinkedHedgesFilters,
	setLinkedHedgesInitialState,
	clearLinkedHedgesSort,
	clearLinkedHedgesFilters,
	clearAllLinkedHedgesFilter,
} = linkedHedgelistFilterSlice.actions;

export default linkedHedgelistFilterSlice.reducer;
