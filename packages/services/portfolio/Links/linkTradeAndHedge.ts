import axiosObject from "../../config";
import baseValidator from "../../baseValidator";

const linkConstraints = {
	hedge_uuid: {
		presence: {
			allowEmpty: false,
			message: "^No hedge ID selected",
		},
	},
	link_amount: {
		presence: {
			allowEmpty: false,
			message: "^Please Enter Link Amount",
		},
	},
};

function linkTradeAndHedge(payload: any, trade_uuid: string) {
	return new Promise((resolve, reject) => {
		var jsValidationErrors = true;
		jsValidationErrors = baseValidator(payload, linkConstraints);
		if (jsValidationErrors === true) {
			let uri = `backend-fx/api/trades/${trade_uuid}/link-hedge`;

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

export { linkTradeAndHedge };
