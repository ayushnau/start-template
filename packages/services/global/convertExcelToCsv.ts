import { read, utils } from "xlsx";
import * as fs from "fs";
import * as Papa from "papaparse";
import path from "path";
import moment from "moment";

const removeSpaces = (key: any) => {
	return key.trim().replace(/ /g, "_").toLowerCase();
};
export const convertExcelToCsv = (uploadedFile: File, header: any) => {
	return new Promise((resolve: any, reject) => {
		const reader = new FileReader();
		reader.onload = (e: any) => {
			const data = e.target.result;
			const workbook = read(data, { type: "array" });
			const sheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[sheetName];
			const json = utils.sheet_to_json(worksheet, { header, range: 1 });

			const updatedJson = json.map((item: any) => {
				let obj: any = {};
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
