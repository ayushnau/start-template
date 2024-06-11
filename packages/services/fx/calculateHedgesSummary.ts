import axiosObject from "../config";

let lastcall_timestamp = 0;
const THROTTLE_TIME_IN_MS = 5000;

const calculateHedgesSummary = () => {
	return new Promise((resolve, reject) => {
		let uri = "backend-fx/api/summary/calculate-hedges-summary";

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

const getHedgesSummary = () => {
	return new Promise((resolve, reject) => {
		let uri = "backend-fx/api/summary/hedges-summary";

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

const rateLimitedCalculateHedgesSummary = async () => {
	const current_timestamp = Date.now();
	if (current_timestamp - lastcall_timestamp > THROTTLE_TIME_IN_MS) {
		lastcall_timestamp = current_timestamp;
		return calculateHedgesSummary();
	} else {
		return null;
	}
};

export {
	calculateHedgesSummary,
	rateLimitedCalculateHedgesSummary,
	getHedgesSummary,
};
