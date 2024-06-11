import moment from "moment";

const checkDate = (date: any) => {
	const date2 = moment(Date.now()).format("YYYY-MM-DD");

	return date.isBefore(date2);
};

export default checkDate;
