import { createSlice } from "@reduxjs/toolkit";

export const toastSlice = createSlice({
	name: "toastConfig",
	initialState: {
		toast: {
			message: "",
			showToast: false,
			type: "",
			className: "",
		},
	},

	reducers: {
		setToastMessage: (state, action) => {
			state.toast = action.payload;
			state.toast.showToast = true;
		},
		clearToast: (state) => {
			state.toast = {
				message: "",
				showToast: false,
				type: "",
				className: "",
			};
		},
	},
});

export const { setToastMessage, clearToast } = toastSlice.actions;

export default toastSlice.reducer;
