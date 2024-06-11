import { getOrdinalSuffix } from "./getOrdinalSuffix";
import { padZero } from "./padZero";

const getCurrentFormattedDate = () => {
	const currentDate = new Date();

	const day = currentDate.getDate();
	const month = currentDate.toLocaleString("en-US", { month: "long" });
	const hours = currentDate.getHours();
	const minutes = currentDate.getMinutes();
	const amOrPm = hours >= 12 ? "PM" : "AM";
	const formattedHours = hours % 12 || 12;

	const formattedDate = `${day}${getOrdinalSuffix(
		day,
	)} ${month}, ${formattedHours}:${padZero(minutes)}${amOrPm}`;

	return formattedDate;
};

export { getCurrentFormattedDate };
