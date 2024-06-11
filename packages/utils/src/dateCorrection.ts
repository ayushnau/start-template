import moment from "moment";

const dateCorrection = (date: any, format = "YYYY-MM-DD") => {
	return moment(date, format).format(format);
};

export { dateCorrection };
