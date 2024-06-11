const capitalizeFirstLetter = (value: string) => {
	if (typeof value === "string") {
		return value.charAt(0).toUpperCase() + value.slice(1);
	}
	return "N/A";
};

export default capitalizeFirstLetter;
