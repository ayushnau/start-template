import axiosObject from "../config";
import baseValidator from "./baseValidator";

const ImportExportConstraints = {
	pair: {
		presence: {
			allowEmpty: false,
			message: "^Please select pair",
		},
	},
	type: {
		presence: {
			allowEmpty: false,
			message: "^Please enter type",
		},
	},
	data: {
		presence: {
			allowEmpty: false,
			message: "^Please enter Data",
		},
	},
};

function getIECalculatedRates(payload: any) {
	return new Promise((resolve, reject) => {
		var jsValidationErrors = baseValidator(payload, ImportExportConstraints);

		let uri = `/backend-rates/calculate-import-export`;
		if (jsValidationErrors === true) {
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

export { getIECalculatedRates };
