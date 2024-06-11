import React from "react";

interface handleSetFilterKeysProps {
	dataSet: any;
	filterKeysList: any;
	activeMaturityGroupingData: any;
	filter_form_values: any;
	setFilterKeysList: any;
	ledgerList: any;
}
const handleSetFilterKeys = ({
	dataSet,
	filterKeysList,
	filter_form_values,
	setFilterKeysList,
	activeMaturityGroupingData,
	ledgerList,
}: handleSetFilterKeysProps) => {
	const currencyList: any = [];
	const bankList: any = [];

	dataSet?.map((value: any) => {
		if (!currencyList.includes(value.currency_pair)) {
			currencyList.push(value.currency_pair);
		}
		if (
			value.bank_name !== null &&
			!bankList.includes(value.bank_name) &&
			value.bank_name !== ""
		) {
			bankList.push(value.bank_name);
		}
	});
	const currentfilterKeyList: any = filterKeysList;
	currentfilterKeyList.map((value: any, index: any) => {
		if (value.formKey === "bank_names") {
			currentfilterKeyList[index].value = bankList;
		}
		if (value.formKey === "maturity_months") {
			currentfilterKeyList[index].value = activeMaturityGroupingData;
		}
	});

	setFilterKeysList(currentfilterKeyList);
};

export default handleSetFilterKeys;
