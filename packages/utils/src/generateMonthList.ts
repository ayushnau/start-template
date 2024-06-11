import moment from "moment";

export interface MonthListInterface {
	date: string;
	month: string;
	year: number;
	month_index: string;
}

const generateMonthList = () => {
	const current_date = new Date();
	current_date.setDate(15);
	const monthsList: MonthListInterface[] = [];
	const monthsInAdvance = 11;

	for (let i = 0; i <= monthsInAdvance; i++) {
		const nextMonth = new Date(current_date);
		nextMonth.setMonth(current_date.getMonth() + i);

		const monthName = new Intl.DateTimeFormat("en-US", {
			month: "short",
		}).format(nextMonth);
		const year = nextMonth.getFullYear();

		monthsList.push({
			date: moment(nextMonth).format("MMM 'YY"),
			month: monthName,
			year: year,
			month_index: (i + 1).toString().padStart(2, "0"),
		});
	}

	return monthsList;
};

export { generateMonthList };
