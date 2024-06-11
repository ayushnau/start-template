import moment from "moment";
import dayjs from "dayjs";
interface handlePcfcFilterProps {
	pcfcList: any;
	setFilterPcfcList: any;
	getActiveFilteredBankList: any;
	getActiveFilteredMonthList: any;
	active_form_values: any;
	filter_form_values: any;
	sort_form_values: any;
}

const handlePcfcFilter = ({
	pcfcList,
	setFilterPcfcList,
	getActiveFilteredBankList,
	getActiveFilteredMonthList,
	active_form_values,
	filter_form_values,
	sort_form_values,
}: handlePcfcFilterProps) => {
	let filteredList = pcfcList;
	filteredList = filteredList?.filter((value: any) => {
		return value.status === active_form_values.label.toLowerCase();
	});
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

	setFilterPcfcList(filteredList);
};

export default handlePcfcFilter;
