import axiosObject from "../config";
import baseValidator from "../baseValidator";

const alertConstraints = {
	pair: {
		presence: {
			allowEmpty: false,
			message: "^Please select currency pair",
		},
	},
	trigger_value: {
		presence: {
			allowEmpty: false,
			message: "^Please enter your value",
		},
	},
};

function saveAlert(payload: any) {
	return new Promise((resolve, reject) => {
		var jsValidationErrors;
		jsValidationErrors = baseValidator(payload, alertConstraints);

		if (jsValidationErrors === true) {
			let uri = `/backend-fx/api/alerts`;
			payload["for_type"] = "pair";
			payload["snooze_time"] = true;

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

export { saveAlert };
