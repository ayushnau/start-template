const filterKeys = [
	{
		heading: "Currency pair",
		formKey: "currency_pairs",
		selectType: "multiple",
		value: [],
		selectedValues: "",
	},
	{
		heading: "Bank name",
		formKey: "bank_names",
		selectType: "multiple",
		value: [],
		selectedValues: "",
	},
	{
		heading: "Credit month",
		formKey: "credit_months",
		selectType: "single",
		value: [],
		selectedValues: "",
	},

	{
		heading: "Maturity month",
		formKey: "maturity_months",
		selectType: "multiple",
		value: [],
		selectedValues: "",
	},
	{
		heading: "Gain/Risk status",
		formKey: "risk_or_gain",
		selectType: "single",
		value: ["gain", "risk"],
		selectedValues: "",
	},
	{
		heading: "Creation type",
		formKey: "eefc_type",
		selectType: "single",
		value: ["manual", "transferred"],
		selectedValues: "",
	},
];

export default filterKeys;
