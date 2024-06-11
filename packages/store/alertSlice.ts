import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
	name: "alert",
	initialState: {
		alertName: "",
		count: 0,
	},

	reducers: {
		setAlertName: (state, action) => {
			state.alertName = action.payload;
			state.count = 1;
		},
		clearAlertName: (state) => {
			state.alertName = "";
			state.count = 0;
		},
	},
});

export const { setAlertName, clearAlertName } = alertSlice.actions;

export default alertSlice.reducer;
