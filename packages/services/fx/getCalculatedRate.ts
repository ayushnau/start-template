import axiosObject from "../config";
import baseValidator from "./baseValidator";

const calculatorConstraints = {
	pair: {
		presence: {
			allowEmpty: false,
			message: "^Please select pair",
		},
	},
	date: {
		presence: {
			allowEmpty: false,
			message: "^Please enter date",
		},
	},
	type: {
		presence: {
			allowEmpty: false,
			message: "^Please enter type",
		},
	},
	amount: {
		presence: {
			allowEmpty: false,
			message: "^Please enter amount",
		},
	},
};

function getCalculatedRate(payload: any) {
	return new Promise((resolve, reject) => {
		var jsValidationErrors = baseValidator(payload, calculatorConstraints);

		let uri = `/backend-rates/rate-calculator`;
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

export { getCalculatedRate };
