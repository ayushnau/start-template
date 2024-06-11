export const filterKeys = (type: any) => {
	const keysList: any = [
		{
			heading:
				type === "useHedges" ? "Hedge Maturity Month" : "Trade Maturity Month",
			formKey: "maturity_months",
			selectType: "multiple",
			value: [],
			selectedValues: [],
		},
		{
			heading: "Bank Name",
			formKey: "bank_names",
			selectType: "multiple",
			value: "",
			selectedValues: "",
		},
	];
	if (type === "useHedges")
		keysList.unshift({
			heading: "Trade type",
			formKey: "hedge_type",
			selectType: "single",
			value: ["import", "export"],
			selectedValues: "",
		});

	return keysList;
};
