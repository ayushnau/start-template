import { createSlice } from "@reduxjs/toolkit";

export const showBottomBarSlice = createSlice({
	name: "bottombar",
	initialState: {
		showBottomNavbar: {
			showBottomBar: false,
		},
	},

	reducers: {
		setShowBottomNavBar: (state, action) => {
			state.showBottomNavbar = action.payload;
			state.showBottomNavbar.showBottomBar = true;
		},
		clearShowBottomNavBar: (state) => {
			state.showBottomNavbar = {
				showBottomBar: false,
			};
		},
	},
});

export const { setShowBottomNavBar, clearShowBottomNavBar } =
	showBottomBarSlice.actions;

export default showBottomBarSlice.reducer;
