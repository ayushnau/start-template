import React from "react";

interface handleSetFilterKeysListProps {
	active_form_values: any;
	eefcList: any;
	filterKeysList: any;
	completedCreatedGroupingData: any;
	activeCreatedGroupingData: any;
	filter_form_values: any;
	setFilterKeysList: any;
	completedMaturityGroupingData: any;
	activeMaturityGroupingData: any;
}
const handleSetFilterKeysList = ({
	active_form_values,
	eefcList,
	filterKeysList,
	completedCreatedGroupingData,
	activeCreatedGroupingData,
	filter_form_values,
	setFilterKeysList,
	completedMaturityGroupingData,
	activeMaturityGroupingData,
}: handleSetFilterKeysListProps) => {
	const currentActiveStatus = active_form_values.label;
	const currencyList: any = [];
	const bankList: any = [];

	eefcList?.map((value: any) => {
		if (
			!currencyList.includes(value.currency_pair) &&
			value.status === currentActiveStatus
		) {
			currencyList.push(value.currency_pair);
		}
		if (
			value.bank_name !== null &&
			!bankList.includes(value.bank_name) &&
			value.status === currentActiveStatus &&
			value.bank_name !== ""
		) {
			bankList.push(value.bank_name);
		}
	});
	const currentfilterKeyList: any = filterKeysList;
	currentfilterKeyList[0].value = currencyList;
	currentfilterKeyList[1].value = bankList;
	currentfilterKeyList[2].value =
		currentActiveStatus === "completed"
			? completedCreatedGroupingData
			: activeCreatedGroupingData;
	currentfilterKeyList[3].value =
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
