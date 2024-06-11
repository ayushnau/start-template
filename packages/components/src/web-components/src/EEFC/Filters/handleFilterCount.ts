export const handleFilterCount = ({
	filter_form_values,
	getActiveFilteredCurrencyList,
	getActiveFilteredMonthList,
	getActiveCreatedFilteredMonthList,
	getActiveFilteredBankList,
}: any) => {
	let count = 0;
	if (filter_form_values.risk_or_gain && filter_form_values.risk_or_gain !== "")
		count++;
	if (filter_form_values.eefc_type && filter_form_values.eefc_type !== "")
		count++;
	if (
		filter_form_values.currency_pairs &&
		filter_form_values.currency_pairs !== ""
	) {
		getActiveFilteredCurrencyList(
			filter_form_values.currency_pairs.split(","),
		).forEach(() => {
			count++;
		});
	}
	if (
		filter_form_values.maturity_months &&
		filter_form_values.maturity_months !== ""
	) {
		const currentCount = getActiveFilteredMonthList(
			filter_form_values.maturity_months.split(","),
		).length;
		count += currentCount;
	}
	if (
		filter_form_values.credit_months &&
		filter_form_values.credit_months !== ""
	) {
		const currentCount = getActiveCreatedFilteredMonthList(
			filter_form_values.credit_months.split(","),
		).length;
		count += currentCount;
	}
	if (filter_form_values.bank_names && filter_form_values.bank_names !== "") {
		const currentCount = getActiveFilteredBankList(
			filter_form_values.bank_names.split(","),
		).length;
		count += currentCount;
	}
	return count === 0 ? "" : `(${count})`;
};
