import axiosObject from "../../config";

const getAllImportTrades = (payload: any) => {
	const keys = Object.keys(payload);
	let uriList: any = [];
	keys.map((value: any) => {
		const currentString = `${value}=${payload[value]}`;
		uriList.push(currentString);
	});
	// console.log({ uriString });
	return new Promise((resolve, reject) => {
		let uri = "backend-fx/api/trades/get-all-trades";
		if (uriList.length !== 0) {
			uri = uri + "?" + uriList.join("&");
		}

		axiosObject
			.get(uri)
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				reject(errors);
			});
	});
};
export { getAllImportTrades };
