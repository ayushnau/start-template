import { read, utils } from "xlsx";
import * as Papa from "papaparse";
import moment from "moment";

const removeSpaces = (key: string) => {
	return key.trim().replace(/ /g, "_").toLowerCase();
};

export const convertXlsToCsv = (
	uploadedFile: File,
	header: any,
): Promise<string> => {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = (e) => {
			const data = e.target?.result;

			// Check if the file is of type xls
			if (!uploadedFile.name.toLowerCase().endsWith(".xls")) {
				reject(new Error("Invalid file type. Only xls files are allowed."));
				return;
			}

			const workbook = read(data as ArrayBuffer, { type: "array" });
			const sheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[sheetName];

			const typeMap: { [key: string]: string } = {};
			header.forEach((col: string, index: number) => {
				typeMap[removeSpaces(col)] = index === 1 ? "d" : "s";
			});

			const json = utils.sheet_to_json(worksheet, {
				header,
				range: 1,
				dateNF: "yyyy-mm-dd",
			}) as any[];

			const updatedJson = json.map((item) => {
				let obj: Record<string, any> = {};
				for (let objKey in item) {
					if (objKey === "maturity_date") {
						obj[removeSpaces(objKey)] = moment(
							new Date(1900, 0, item[objKey]),
						).format("YYYY-MM-DD");
					} else obj[removeSpaces(objKey)] = String(item[objKey]);
				}
				return obj;
			});

			const csv = Papa.unparse(updatedJson);
			resolve(csv);
		};

		reader.readAsArrayBuffer(uploadedFile);
	});
};
