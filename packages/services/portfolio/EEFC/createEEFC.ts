import axiosObject from "../../config";
import baseValidator from "../../baseValidator";

const createEEFCConstraints = {
	eefc_type: {
		presence: {
			allowEmpty: false,
			message: "^Please add the eefc_type",
		},
	},
	currency_pair: {
		presence: {
			allowEmpty: false,
			message: "^Please add the currency pair",
		},
	},
	eefc_amount: {
		presence: {
			allowEmpty: false,
			message: "^Please add the eefc_amount",
		},
	},
	benchmark_rate: {
		presence: {
			allowEmpty: false,
			message: "^Please add the benchmark_rate",
		},
	},
	maturity_date: {
		presence: {
			allowEmpty: false,
			message: "^Please add the maturity_date",
		},
	},
	credit_date: {
		presence: {
			allowEmpty: false,
			message: "^Please add the credit_date",
		},
	},
	bank_name: {
		presence: {
			allowEmpty: true,
			message: "^Please add the bank_name",
		},
	},
	invoice_number: {
		presence: {
			allowEmpty: true,
			message: "^Please add the invoice_number",
		},
	},
	cp_name: {
		presence: {
			allowEmpty: true,
			message: "^Please add the cp_name",
		},
	},
};

function createEEFC(payload: any) {
	const pay = new Array(1);
	pay[0] = payload;
	return new Promise((resolve, reject) => {
		let jsValidationErrors = baseValidator(payload, createEEFCConstraints);
		if (jsValidationErrors === true) {
			let uri = `backend-fx/api/eefcs`;
			// let uri = `http://127.0.0.1:8000/api/eefcs`;

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

export { createEEFC };
