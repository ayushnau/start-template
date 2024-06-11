import React from "react";

interface handleSetFilterKeysListProps {
	active_form_values: any;
	filterKeysList: any;
	filter_form_values: any;
	setFilterKeysList: any;
	completedMaturityGroupingData: any;
	activeMaturityGroupingData: any;
	bankList: any;
}
const handleSetFilterKeysList = ({
	active_form_values,
	filterKeysList,
	filter_form_values,
	setFilterKeysList,
	completedMaturityGroupingData,
	activeMaturityGroupingData,
	bankList,
}: handleSetFilterKeysListProps) => {
	const currentActiveStatus = active_form_values.label;
	const currentfilterKeyList: any = filterKeysList;
	currentfilterKeyList[1].value = [];
	if (bankList) currentfilterKeyList[1].value = bankList;
	currentfilterKeyList[0].value =
		currentActiveStatus === "completed"
			? completedMaturityGroupingData
			: activeMaturityGroupingData;

	currentfilterKeyList.map((value: any) => {
		const currentKey = value.formKey;
		if (filter_form_values[currentKey] !== undefined)
			value.selectedValues = filter_form_values[currentKey];
	});

	setFilterKeysList(currentfilterKeyList);
};

export default handleSetFilterKeysList;
