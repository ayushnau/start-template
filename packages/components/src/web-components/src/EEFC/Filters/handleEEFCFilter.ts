import moment from "moment";
interface handleEEFCFilterProps {
	eefcList: any;
	setFilterEefcAccountList: any;
	getActiveFilteredCurrencyList: any;
	getActiveFilteredBankList: any;
	getActiveFilteredMonthList: any;
	getActiveCreatedFilteredMonthList: any;
	active_form_values: any;
	filter_form_values: any;
	sort_form_values: any;
}

const handleEEFCFilter = ({
	eefcList,
	setFilterEefcAccountList,
	getActiveFilteredCurrencyList,
	getActiveFilteredBankList,
	getActiveFilteredMonthList,
	getActiveCreatedFilteredMonthList,
	active_form_values,
	filter_form_values,
	sort_form_values,
}: handleEEFCFilterProps) => {
	let filteredList = eefcList;
	filteredList = filteredList?.filter((value: any) => {
		return value.status === active_form_values.label.toLowerCase();
	});
	Object.keys(filter_form_values).map((currentFilter: any) => {
		filteredList = filteredList?.filter((value: any) => {
			switch (currentFilter) {
				case "currency_pairs":
					if (filter_form_values[currentFilter].split(",")[0] === "") {
						return true;
					}

					const currentCheckFilterList = getActiveFilteredCurrencyList(
						filter_form_values[currentFilter].split(","),
					);
					if (currentCheckFilterList.length === 0) return true;
					return currentCheckFilterList.includes(value.currency_pair);
					break;
				case "eefc_type":
					if (filter_form_values[currentFilter] === "") {
						return true;
					}
					return value.eefc_type === filter_form_values[currentFilter];
					break;
				case "risk_or_gain":
					if (filter_form_values[currentFilter] === "") return true;
					const currenctActiveCheck =
						active_form_values.label === "completed"
							? value.pnl > 0
							: value.mtm > 0;
					const currentGainLoss = currenctActiveCheck ? "gain" : "risk";
					return currentGainLoss === filter_form_values[currentFilter];
				case "bank_names":
					if (filter_form_values[currentFilter] === "") return true;
					const currentCheckBankList = getActiveFilteredBankList(
						filter_form_values[currentFilter].split(","),
					);
					if (currentCheckBankList.length === 0) return true;
					return currentCheckBankList.includes(value.bank_name);
				case "maturity_months":
					if (filter_form_values[currentFilter] === "") return true;
					const checkFilterDateList = getActiveFilteredMonthList(
						filter_form_values.maturity_months.split(","),
					);

					if (checkFilterDateList.length === 0) return true;
					return checkFilterDateList.includes(
						moment(value.maturity_date).format("Y-MM"),
					);
				case "credit_months":
					if (filter_form_values[currentFilter] === "") return true;
					const checkCreditFilterDateList = getActiveCreatedFilteredMonthList(
						filter_form_values.credit_months.split(","),
					);

					if (checkCreditFilterDateList.length === 0) return true;

					return checkCreditFilterDateList.includes(
						moment(value.created_at).format("Y-MM"),
					);

				default:
					return true;
			}
		});
	});

	const { sort_by, order_by } = sort_form_values;
	if (sort_by !== "" && order_by !== "") {
		filteredList.sort((value1: any, value2: any) => {
			if (sort_by === "credit_date") {
				const firstDate: any = new Date(value1.credit_date);
				const secondDate: any = new Date(value2.credit_date);
				if (order_by === "asc") return firstDate - secondDate;
				else return secondDate - firstDate;
			} else if (sort_by === "maturity_date") {
				const firstDate: any = new Date(value1.maturity_date);
				const secondDate: any = new Date(value2.maturity_date);
				if (order_by === "asc") return firstDate - secondDate;
				else return secondDate - firstDate;
			} else {
				if (order_by === "asc")
					return value1["remaining_amount"] - value2["remaining_amount"];
				else return value2["remaining_amount"] - value1["remaining_amount"];
			}
		});
	}

	setFilterEefcAccountList(filteredList);
};

export default handleEEFCFilter;
