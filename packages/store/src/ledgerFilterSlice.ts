import { createSlice } from "@reduxjs/toolkit";

export const ledgerFilterSlice = createSlice({
	name: "login",
	initialState: {
		sort: {
			sort_by: "",
			order_by: "",
			value: "",
		},
	},

	reducers: {
		setLedgersSort: (state, action) => {
			state.sort = { ...state.sort, ...action.payload };
		},

		clearLedgersSort: (state) => {
			state.sort = {
				sort_by: "",
				order_by: "",
				value: "",
			};
		},
	},
});

export const { setLedgersSort, clearLedgersSort } = ledgerFilterSlice.actions;

export default ledgerFilterSlice.reducer;
