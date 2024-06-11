import axiosObject from "../../config";
import baseValidator from "../../baseValidator";

const createTradeConstraints = {
	ledger_id: {
		presence: {
			allowEmpty: false,
			message: "^No leger name selected",
		},
	},
	currency_pair: {
		presence: {
			allowEmpty: false,
			message: "^Please add the currency pair",
		},
	},
	trade_amount: {
		presence: {
			allowEmpty: false,
			message: "^Please add the amount of trade",
		},
	},
	trade_type: {
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
	uuid: {
		presence: {
			allowEmpty: true,
			message: "^Please add the Trade ID",
		},
	},
};

function updateTrade(payload: any, id: any) {
	const pay = new Array(1);
	pay[0] = payload;
	return new Promise((resolve, reject) => {
		var jsValidationErrors = true;
		if (jsValidationErrors === true) {
			let uri = `backend-fx/api/trades/${id}`;

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

export { updateTrade };
