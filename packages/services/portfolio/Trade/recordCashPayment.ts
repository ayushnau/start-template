// TODO: Move this to transactions and merge with create transaction.

import axiosObject from "../../config";
import baseValidator from "../../baseValidator";

const recordPaymentConstraints = {
	amount: {
		presence: {
			allowEmpty: false,
			message: "^Please enter amount",
		},
	},
	cash_rate: {
		presence: {
			allowEmpty: false,
			message: "^Please enter cash rate",
		},
	},
	date_of_transaction: {
		presence: {
			allowEmpty: false,
			message: "^Please enter date of transaction",
		},
	},
};

function recordCashPayment(payload: any) {
	const newPayload = [
		{
			trade_uuid: payload.trade_uuid,
			amount: payload.amount,
			amount_currency: payload.amount_currency,
			date_of_transaction: payload.date_of_transaction,
			type: "transaction_via_cash_trade",
			pnl: payload.pnl,
			transaction_data: {
				cash_rate: payload.cash_rate,
				cash_rate_currency: payload.cash_rate_currency,
			},
		},
	];
	return new Promise((resolve, reject) => {
		var jsValidationErrors = true;
		//jsValidationErrors = baseValidator(payload, recordPaymentConstraints);
		if (jsValidationErrors === true) {
			let uri = `backend-fx/api/transactions`;

			axiosObject
				.post(uri, newPayload)
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

export { recordCashPayment };
