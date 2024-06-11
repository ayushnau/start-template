import moment from "moment";

export function convertCsvToJson(
	csvContent: string,
	headers: any,
	skipText = false,
): Promise<string> {
	const removeSpaces = (key: any) => {
		return key?.trim().replace(/ /g, "_");
	};
	return new Promise((resolve: any, reject: any) => {
		let rows = csvContent.split("\n");

		//This is for row skipping and will read from the 11th row and onwards
		if (skipText) {
			rows.splice(0, 11);
		}

		rows = rows.filter((value) => {
			return value !== "";
		});
		const jsonData = rows.slice(1).map((row) => {
			const values = row.split(",").map((value) => {
				return value?.trim();
			});

			const entry: any = {};
			let ignoreFlag = false;
			headers.forEach((header: any, index: any) => {
				if (values[index] !== "") {
					if (header === "trade_type" || header === "hedge_type") {
						let formatted_value = values[index].toLowerCase();
						entry[header] = removeSpaces(formatted_value);
					} else if (header === "maturity_date") {
						let formatted_date = moment(values[index]).format("YYYY-MM-DD");
						if (formatted_date === "Invalid date") {
							formatted_date = moment(values[index], "DD/MM/YYYY").format(
								"YYYY-MM-DD",
							);
						}
						entry[header] = removeSpaces(formatted_date);
					} else if (header === "hedge_amount" || header === "trade_amount") {
						entry[header] = removeSpaces(values[index]);
						if (removeSpaces(values[index]) === "0") {
							ignoreFlag = true;
						}
					} else {
						entry[header] = removeSpaces(values[index]);
					}
				}
			});

			if (ignoreFlag) {
				return {};
			}
			return entry;
		});

		if (jsonData.length < 1) {
			reject({
				message: "No Values found. Pls enter valid data",
			});
		}

		const filteredData = jsonData.filter(
			(ele: any) => Object.keys(ele).length > 0,
		);
		resolve(filteredData);
	});
}
