import { createSlice } from "@reduxjs/toolkit";

const filters_initial_state = {
	risk_or_gain: "",
	maturity_months: "",
	bank_names: "",
	ledger_list: "",
};

export const importNetOffEEFCSlice = createSlice({
	name: "importNetOffEEFCSlice",
	initialState: {
		sort: {
			sort_by: "",
			order_by: "",
			value: "",
		},
		filter: filters_initial_state,
	},

	reducers: {
		setImportNetOffTradesSort: (state, action) => {
			state.sort = { ...state.sort, ...action.payload };
		},

		setImportNetOffTradesFilters: (state, action) => {
			state.filter = { ...state.filter, ...action.payload };
		},

		setImportNetOffTradesInitialState: (state, action) => {
			state.filter = filters_initial_state;
		},

		clearImportNetOffTradesSort: (state) => {
			state.sort = {
				sort_by: "",
				order_by: "",
				value: "",
			};
		},
		clearImportNetOffTradesFilters: (state) => {
			state.filter = filters_initial_state;
		},

		clearAllImportNetOffTradesFilter: (state) => {
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
	setImportNetOffTradesSort,
	setImportNetOffTradesFilters,
	setImportNetOffTradesInitialState,
	clearImportNetOffTradesSort,
	clearImportNetOffTradesFilters,
	clearAllImportNetOffTradesFilter,
} = importNetOffEEFCSlice.actions;

export default importNetOffEEFCSlice.reducer;
