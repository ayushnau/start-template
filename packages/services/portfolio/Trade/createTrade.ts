import axiosObject from "../../config";
import baseValidator from "../../baseValidator";

const createTradeConstraints = {
	workbook_id: {
		presence: {
			allowEmpty: false,
			message: "^Please add the name",
		},
	},
	currency_pair: {
		presence: {
			allowEmpty: false,
			message: "^Please add the currency pair",
		},
	},
	amount_of_exposure: {
		presence: {
			allowEmpty: false,
			message: "^Please add the amount of trade",
		},
	},
	exposure_type: {
		presence: {
			allowEmpty: false,
			message: "^Please add the trade type",
		},
	},
	maturity_date: {
		presence: {
			allowEmpty: false,
			message: "^Please add the maturity date",
		},
	},
	benchmark_rate: {
		presence: {
			allowEmpty: false,
			message: "^Please add the benchmark rate",
		},
	},
	id: {
		presence: {
			allowEmpty: true,
			message: "^Please add the ID",
		},
	},
	type: {
		presence: {
			allowEmpty: false,
			message: "^Please add the type",
		},
	},
	counterparty_invoice_number: {
		presence: {
			allowEmpty: true,
			message: "^Please add the counterparty invoice number",
		},
	},
	counterparty_name: {
		presence: {
			allowEmpty: true,
			message: "^Please add the counterparty name",
		},
	},
};

function createTrade(payload: any) {
	const pay = new Array(1);
	pay[0] = payload;
	return new Promise((resolve, reject) => {
		var jsValidationErrors = true;
		if (jsValidationErrors === true) {
			let uri = `backend-fx/api/trades`;

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

export { createTrade };
