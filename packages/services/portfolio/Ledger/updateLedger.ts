import axiosObject from "../../config";
import baseValidator from "../../baseValidator";

const createLedgerConstraints = {
	name: {
		presence: {
			allowEmpty: false,
			message: "^Please add the name",
		},
	},
	description: {
		presence: {
			allowEmpty: true,
			message: "^Please add the description",
		},
	},
};

function updateLedger(payload: any) {
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
					reject(errors);
				});
		} else {
			reject(jsValidationErrors);
		}
	});
}

export { updateLedger };
