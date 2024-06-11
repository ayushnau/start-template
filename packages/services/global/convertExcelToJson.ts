export function convertExcelToJson(file: File, headers: any): Promise<string> {
	return new Promise((resolve: any, reject) => {
		const reader = new FileReader();

		reader.onload = (event) => {
			if (event.target?.result) {
				const fileContent: string = event.target.result as string;
				const rows = fileContent.split("\n");
				const jsonData = rows.slice(1).map((row) => {
					const values = row
						.split(/\s+/)
						.map((value) => value.trim())
						.filter((value) => value !== "");
					const entry: any = {};
					headers.forEach((header: any, index: any) => {
						entry[header] = values[index];
					});
					return entry;
				});

				// Output the result

				resolve(jsonData);
			} else {
				reject("Failed to read file content");
			}
		};

		reader.onerror = (event) => {
			reject("Error reading file");
		};

		// Read the content of the file
		reader.readAsText(file);
	});
}
