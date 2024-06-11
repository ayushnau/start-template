import axiosObject from "../../config";
import baseValidator from "../../baseValidator";

const createHedgeConstraints = {
	hedge_type: {
		presence: {
			allowEmpty: false,
			message: "^Please add the hedge_type",
		},
	},
	currency_pair: {
		presence: {
			allowEmpty: false,
			message: "^Please add the currency pair",
		},
	},
	hedge_amount: {
		presence: {
			allowEmpty: false,
			message: "^Please add the Hedge_amount",
		},
	},
	hedged_rates: {
		presence: {
			allowEmpty: false,
			message: "^Please add the hedged_rates",
		},
	},
	maturity_date: {
		presence: {
			allowEmpty: false,
			message: "^Please add the maturity_date",
		},
	},
	bank_name: {
		presence: {
			allowEmpty: true,
			message: "^Please add the bank_name",
		},
	},
	hedge_basis: {
		presence: {
			allowEmpty: true,
			message: "^Please add the hedge_basis",
		},
	},
};

function createHedge(payload: any) {
	const pay = new Array(1);
	pay[0] = payload;
	return new Promise((resolve, reject) => {
		let jsValidationErrors = baseValidator(payload, createHedgeConstraints);
		if (jsValidationErrors === true) {
			let uri = `backend-fx/api/hedges`;

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

export { createHedge };
