import axiosObject from "../config";

let lastcall_timestamp = 0;
const THROTTLE_TIME_IN_MS = 5000;

const calculateLedgerSummary = (id: number) => {
	return new Promise((resolve, reject) => {
		const payload = {
			ledgerIds: [id],
		};
		let uri = "backend-fx/api/summary/calculate-ledger-summary";

		axiosObject
			.post(uri, payload)
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				reject(errors);
			});
	});
};

const getLedgerSummary = (id: number) => {
	return new Promise((resolve, reject) => {
		const payload = {
			ledgerIds: [id],
		};
		let uri = "backend-fx/api/summary/ledger-summary";

		axiosObject
			.post(uri, payload)
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				reject(errors);
			});
	});
};

const rateLimitedCalculateLedgerSummary = async (id: number) => {
	const current_timestamp = Date.now();
	if (current_timestamp - lastcall_timestamp > THROTTLE_TIME_IN_MS) {
		lastcall_timestamp = current_timestamp;
		return calculateLedgerSummary(id);
	} else {
		return null;
	}
};

export {
	calculateLedgerSummary,
	rateLimitedCalculateLedgerSummary,
	getLedgerSummary,
};
