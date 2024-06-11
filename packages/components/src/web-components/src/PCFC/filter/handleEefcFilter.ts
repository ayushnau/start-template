import moment from "moment";
import dayjs from "dayjs";
interface handleEefcFilterProps {
	dataList: any;
	setFilterData: any;
	getActiveFilteredBankList: any;
	getActiveFilteredMonthList: any;
	active_form_values: any;
	filter_form_values: any;
	sort_form_values: any;
}

const handleEefcFilter = ({
	dataList,
	setFilterData,
	getActiveFilteredBankList,
	getActiveFilteredMonthList,
	active_form_values,
	filter_form_values,
	sort_form_values,
}: handleEefcFilterProps) => {
	let filteredList = dataList;
	Object.keys(filter_form_values).map((currentFilter: any) => {
		filteredList = filteredList?.filter((value: any) => {
			switch (currentFilter) {
				case "bank_name":
					if (filter_form_values[currentFilter] == "") return true;
					const currentCheckBankList = getActiveFilteredBankList(
						filter_form_values[currentFilter].split(","),
					);
					if (currentCheckBankList.length === 0) return true;

					return currentCheckBankList.includes(value.bank_name);
				case "maturity_months":
					if (filter_form_values[currentFilter] === "") return true;
					const checkFilterDateList = getActiveFilteredMonthList(
						filter_form_values[currentFilter].split(","),
					);

					if (checkFilterDateList.length === 0) return true;

					return checkFilterDateList.includes(
						dayjs(value.maturity_date).format("YYYY-MM"),
					);
				case "ledger_list":
					if (
						filter_form_values[currentFilter] === "" ||
						filter_form_values[currentFilter] === "1000000000"
					)
						return true;
					return filter_form_values[currentFilter]
						.split(",")
						.includes(`${value.ledger_id}`);

				default:
					return true;
			}
		});
	});

	const { sort_by, order_by } = sort_form_values;
	if (sort_by !== "" && order_by !== "") {
		filteredList.sort((value1: any, value2: any) => {
			if (sort_by === "maturity_date") {
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

	setFilterData(filteredList);
};

export default handleEefcFilter;
