import { createSlice } from "@reduxjs/toolkit";

export const webHomeScreenSlice = createSlice({
	name: "homeScreen",
	initialState: {
		homeScreen: "home",
	},

	reducers: {
		setWebHomeScreen: (state, action) => {
			state.homeScreen = action.payload;
		},
		clearWebHomeScreen: (state) => {
			state.homeScreen = "home";
		},
	},
});

export const { setWebHomeScreen, clearWebHomeScreen } =
	webHomeScreenSlice.actions;

export default webHomeScreenSlice.reducer;
