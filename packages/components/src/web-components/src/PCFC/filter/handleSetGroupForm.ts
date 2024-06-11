export const handleSetGroupForm = (groupForm: any, response: any) => {
	groupForm.setField(
		"completedMaturityGroupingData",
		response.completed_maturity_grouping_data,
	);
	groupForm.setField(
		"activeMaturityGroupingData",
		response.active_maturity_grouping_data,
	);

	groupForm.setField(
		"completedMaturityGroupingDataList",
		response.completed_maturity_grouping_data.map((value: any) => {
			return Object.keys(value)[0];
		}),
	);

	groupForm.setField(
		"activeMaturityGroupingDataList",
		response.active_maturity_grouping_data.map((value: any) => {
			return Object.keys(value)[0];
		}),
	);
	groupForm.setField("activeBankGroupingDataList", response.active_bank_list);
	groupForm.setField(
		"completedBankGroupingDataList",
		response.completed_bank_list,
	);
};
