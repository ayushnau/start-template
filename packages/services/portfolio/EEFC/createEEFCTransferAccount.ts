import axiosObject from "../../config";
import baseValidator from "../../baseValidator";

const createTradeEEFCTransferAccountConstraints = {
	eefc_amount: {
		presence: {
			allowEmpty: false,
			message: "^Please enter the eefc amount",
		},
	},
	credit_date: {
		presence: {
			allowEmpty: false,
			message: "^Please add the credit_date",
		},
	},
	maturity_date: {
		presence: {
			allowEmpty: false,
			message: "^Please add the maturity_date",
		},
	},
};

function createTradeEEFCTransferAccount(payload: any, tradeId: any) {
	const pay = payload;
	return new Promise((resolve, reject) => {
		let jsValidationErrors = baseValidator(
			payload,
			createTradeEEFCTransferAccountConstraints,
		);

		if (jsValidationErrors === true) {
			let uri = `backend-fx/api/trades/${tradeId}/eefc-transfer`;
			// let uri = `http://127.0.0.1:8000/api/trades/${tradeId}/eefc-transfer`;

			axiosObject
				.post(uri, pay)
				.then((response) => {
					resolve(response.data);
				})
				.catch((errors) => {
					reject(errors);
				});
		} else {
			reject(jsValidationErrors);
		}
	});
}

export { createTradeEEFCTransferAccount };
