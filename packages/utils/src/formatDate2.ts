import moment from "moment";
const formatDate2 = (date: any) => {
	return moment(date, "YYYY-MM-DD").format("DD MMM 'YY");
};

export default formatDate2;
