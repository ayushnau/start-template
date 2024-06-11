import moment from "moment";

const formatDate = (date: any) => {
	return moment(date, "YYYY-MM-DD").format("Do MMMM YYYY");
};

export default formatDate;
