import axiosObject from "../config";
import baseValidator from "../baseValidator";

const createLedgerConstraints = {
	name: {
		presence: {
			allowEmpty: false,
			message: "^Please enter the ledger name",
		},
	},
	description: {
		presence: {
			allowEmpty: true,
			message: "^Please add the descriptoin",
		},
	},
};

function createLedger(payload: any) {
	return new Promise((resolve, reject) => {
		var jsValidationErrors;
		jsValidationErrors = baseValidator(payload, createLedgerConstraints);

		if (jsValidationErrors === true) {
			let uri = `backend-fx/api/work-books`;

			axiosObject
				.post(uri, payload)
				.then((response) => {
					resolve(response.data);
				})
				.catch((errors) => {
					reject(errors.response.data.errors);
				});
		} else {
			reject(jsValidationErrors);
		}
	});
}

export { createLedger };
