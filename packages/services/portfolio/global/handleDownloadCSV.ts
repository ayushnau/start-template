import { convertJsonToCsv } from "../../global/convertJsonToCsv";

export const handleDownloadCSV = async ({ headers, jsonData, type }: any) => {
	const csv = convertJsonToCsv({ jsonData: jsonData, headers });
	var csvFile = new Blob([csv], { type: "contentType" });
	const url = window.URL.createObjectURL(csvFile);
	const a = document.createElement("a");
	a.style.display = "none";
	a.href = url;
	a.download = `${type}.csv`;
	document.body.appendChild(a);
	a.click();
	window.URL.revokeObjectURL(url);
	document.body.removeChild(a);
};
