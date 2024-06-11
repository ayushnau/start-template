import moment from "moment";
interface handleFilterProps {
	dataSet: any;
	setFilterDataList: any;
	filter_form_values: any;
	sort_form_values: any;
}

export const handleFilter = ({
	dataSet,
	setFilterDataList,
	filter_form_values,
	sort_form_values,
}: handleFilterProps) => {
	let filteredList = dataSet;
	Object.keys(filter_form_values).map((currentFilter: any) => {
		filteredList = filteredList?.filter((value: any) => {
			switch (currentFilter) {
				case "hedge_type":
					if (filter_form_values[currentFilter] === "") {
						return true;
					}
					return value.hedge_type === filter_form_values[currentFilter];
					break;
				case "bank_names":
					if (filter_form_values[currentFilter] === "") return true;
					const currentCheckBankList =
						filter_form_values[currentFilter].split(",");
					if (currentCheckBankList.length === 0) return true;
					return currentCheckBankList.includes(value.bank_name);
				case "maturity_months":
					if (filter_form_values[currentFilter] === "") return true;
					const checkFilterDateList =
						filter_form_values.maturity_months.split(",");

					if (checkFilterDateList.length === 0) return true;
					return checkFilterDateList.includes(
						moment(value.maturity_date).format("Y-MM"),
					);
				case "ledger_list":
					if (filter_form_values[currentFilter] === "") return true;
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
	setFilterDataList(filteredList);
};
