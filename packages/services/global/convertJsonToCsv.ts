function processHeaders(value: string): string {
	let modifiedValue = "";

	if (value === "mtm" || value === "pnl") {
		modifiedValue = value === "mtm" ? "Gain/Risk" : "Profit/Loss";
	} else if (value == "cp_invoice_number") {
		return (modifiedValue = "Counter Party Invoice Number");
	} else if (value == "cp_name") {
		return (modifiedValue = "Counter Party Name");
	} else if (value === "bank_name") {
		return (modifiedValue = "Bank Name");
	} else {
		modifiedValue = value
			.split("_")
			.map((ele: string) => ele[0].toUpperCase() + ele.slice(1))
			.join(" ");
	}

	return modifiedValue;
}

export function convertJsonToCsv({ jsonData, headers }: any) {
	let csv = "";
	if (jsonData.length > 0) {
		const keys = Object.keys(jsonData[0]);
		const filteredKeys = headers.filter((value: any) => {
			return keys.includes(value);
		});

		const edited_header = filteredKeys.map((ele: string) =>
			processHeaders(ele),
		);
		csv += edited_header.join(",") + "\n";
		jsonData.forEach((item: any) => {
			const values = filteredKeys.map((key: any) => {
				if (
					key === "bank_name" ||
					key === "loan_number" ||
					key === "order_number"
				) {
					return item[key] === null ? "-" : item[key];
				}
				if (
					key === "mtm" ||
					key === "pnl" ||
					key === "remaining_amount" ||
					key === "pcfc_amount"
				) {
					return parseFloat(item[key]).toFixed(2);
				}
				if (key === "maturity_date") {
					return item[key].split(" ")[0];
				}
				return item[key] === null
					? key == "current_market_rates"
						? "null"
						: null
					: item[key];
			});
			csv += values.join(",") + "\n";
		});
	}
	return csv;
}
