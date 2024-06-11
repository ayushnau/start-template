import { createSlice } from "@reduxjs/toolkit";

export const eefcPcfcModuleListSlice = createSlice({
	name: "eefcPcfcModuleListSlice",
	initialState: {
		eefcList: {},
		currentSelectedEefcRecord: {},
		refresh: new Date(),
	},

	reducers: {
		setEefcList: (state: any, action) => {
			state.eefcList = action.payload;
		},
		currentSelectedEefcRecord: (state: any, action) => {
			state.currentSelectedEefcRecord = action.payload;
		},

		updateEefcSpecificRecord: (state: any, action: any) => {
			const data = action.payload;
			state.eefcList[data.uuid] = data;
		},

		clearAllEefcList: (state: any) => {
			state.eefcList = {};
		},
		refreshEefc: (state: any) => {
			state.refresh = new Date();
		},
	},
});

export const {
	setEefcList,
	clearAllEefcList,
	updateEefcSpecificRecord,
	refreshEefc,
	currentSelectedEefcRecord,
} = eefcPcfcModuleListSlice.actions;

export default eefcPcfcModuleListSlice.reducer;
