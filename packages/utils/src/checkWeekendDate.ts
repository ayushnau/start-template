import moment from "moment";
export const checkWeekendDate = (date: any) => {
	if (
		moment(date).format("dddd") === "Saturday" ||
		moment(date).format("dddd") === "Sunday"
	) {
		alert("Selected date is weekend. Please select a serviceable date!");
		return true;
	}
	return false;
};
