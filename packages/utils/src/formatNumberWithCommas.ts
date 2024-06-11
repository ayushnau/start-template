const formatNumberWithCommas = (number: any): string => {
	if (number !== undefined) {
		number = Math.abs(number);
		const roundedNumber = Math.round(number * 100) / 100;
		const parts = roundedNumber.toString().split(".");
		if (parts.length === 1) {
			parts.push("00");
		} else if (parts[1].length === 1) {
			parts[1] += "0";
		}
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return parts.join(".");
	}
	return "";
};

export default formatNumberWithCommas;
