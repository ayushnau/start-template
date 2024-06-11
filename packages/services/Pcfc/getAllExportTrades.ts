// import axiosObject from "config";
import axiosObject from "../config";

const getAllExportTrades = (payload: any) => {
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
		console.log(uri);
		// ("backend-fx/api/trades/get-all-trades?trade_type=export&status=active&currency_pairs=USD/INR");
		// let uri = `http://127.0.0.1:8000/api/trades/get-all-trades`;
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
export { getAllExportTrades };
