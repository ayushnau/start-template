import axiosObject from "../../config";
import baseValidator from "../../baseValidator";

const updateEEFCConstraints = {
	eefc_type: {
		presence: {
			allowEmpty: false,
			message: "^Please add the eefc type",
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
			message: "^Please add the eefc amount",
		},
	},
	benchmark_rate: {
		presence: {
			allowEmpty: false,
			message: "^Please add the benchmark rate",
		},
	},
	maturity_date: {
		presence: {
			allowEmpty: false,
			message: "^Please add the maturity date",
		},
	},
	credit_date: {
		presence: {
			allowEmpty: false,
			message: "^Please add the credit date",
		},
	},
	bank_name: {
		presence: {
			allowEmpty: true,
			message: "^Please add the bank name",
		},
	},
};

function updateEEFC(payload: any, uuid: any) {
	const pay = new Array(1);
	pay[0] = payload;
	return new Promise((resolve, reject) => {
		let jsValidationErrors = baseValidator(payload, updateEEFCConstraints);
		if (jsValidationErrors === true) {
			let uri = `backend-fx/api/eefcs/${uuid}`;
			// let uri = `http://127.0.0.1:8000/api/eefcs/${uuid}`;

			axiosObject
				.patch(uri, pay)
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

export { updateEEFC };
