import moment from "moment";

const convertUnixTimestampToDate = (timestamp: string, format?: string) => {
	const date = new Date(parseInt(timestamp));
	return moment(date).format(format ? format : "DD MMM'YY");
};

export { convertUnixTimestampToDate };
