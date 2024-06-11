const getIDFromParams = (str: string, regex: RegExp) => {
	const match = str.match(regex);

	if (match) {
		const number = match[1]; // Captured number is in the first capturing group
		return number; // Output: 464 (or any other number)
	} else {
		return "NOT FOUND";
	}
};

export { getIDFromParams };
