const returnNumbersOnly = (val: string) => {
	const test_regex = /^-?\d+(\.\d+)?$/;

	if (val.split("")[val.length - 1].match(test_regex)) {
		return val;
	}
	return null;
};

export default returnNumbersOnly;
