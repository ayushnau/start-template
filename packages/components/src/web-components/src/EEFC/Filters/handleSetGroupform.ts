export const handleSetGroupForm = (groupForm: any, response: any) => {
	groupForm.setField("completedEEFCs", response.completed_eefcs_count);
	groupForm.setField(
		"completedMaturityGroupingData",
		response.completed_maturity_grouping_data,
	);
	groupForm.setField(
		"activeMaturityGroupingData",
		response.active_maturity_grouping_data,
	);
	groupForm.setField(
		"activeCreatedGroupingData",
		response.active_created_grouping_data,
	);
	groupForm.setField(
		"completedCreatedGroupingData",
		response.completed_created_grouping_data,
	);
	groupForm.setField(
		"completedCurrencyGroupingDataList",
		response.completed_currency_grouping_data.map(
			(value: any) => value.currency_pair,
		),
	);
	groupForm.setField(
		"activeCurrencyGroupingDataList",
		response.active_currency_grouping_data.map(
			(value: any) => value.currency_pair,
		),
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

	groupForm.setField(
		"activeCreatedGroupingDataList",
		response.active_created_grouping_data.map((value: any) => {
			return Object.keys(value)[0];
		}),
	);

	groupForm.setField(
		"completedCreatedGroupingDataList",
		response.completed_created_grouping_data.map((value: any) => {
			return Object.keys(value)[0];
		}),
	);
};
