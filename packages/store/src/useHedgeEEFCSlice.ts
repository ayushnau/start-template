import { createSlice } from "@reduxjs/toolkit";

const filters_initial_state = {
	risk_or_gain: "",
	maturity_months: "",
	bank_names: "",
};

export const useHedgeEEFCSlice = createSlice({
	name: "useHedgeEEFCSlice",
	initialState: {
		sort: {
			sort_by: "",
			order_by: "",
			value: "",
		},
		filter: filters_initial_state,
	},

	reducers: {
		setUseHedgeEEFCSort: (state, action) => {
			state.sort = { ...state.sort, ...action.payload };
		},

		setUseHedgeEEFCFilters: (state, action) => {
			state.filter = { ...state.filter, ...action.payload };
		},

		setUseHedgeEEFCInitialState: (state, action) => {
			state.filter = filters_initial_state;
		},

		clearUseHedgeEEFCSort: (state) => {
			state.sort = {
				sort_by: "",
				order_by: "",
				value: "",
			};
		},
		clearUseHedgeEEFCFilters: (state) => {
			state.filter = filters_initial_state;
		},

		clearAllUseHedgeEEFCFilter: (state) => {
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
	setUseHedgeEEFCSort,
	setUseHedgeEEFCFilters,
	setUseHedgeEEFCInitialState,
	clearUseHedgeEEFCSort,
	clearUseHedgeEEFCFilters,
	clearAllUseHedgeEEFCFilter,
} = useHedgeEEFCSlice.actions;

export default useHedgeEEFCSlice.reducer;
