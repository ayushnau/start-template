const getStateValue = (amount: string) => {
	if (amount === "0" || amount === "-0") {
		return "zero";
	} else if (amount.includes("-")) {
		return "losing";
	} else {
		return "gaining";
	}
};

const getEndLabel = (amount: string) => {
	if (amount === "0" || amount === "-0") {
		return "";
	} else if (amount.includes("-")) {
		return "Loss";
	} else {
		return "Gain";
	}
};

export { getEndLabel, getStateValue };
