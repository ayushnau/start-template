import axiosObject from "../../config";

const getHedgesWeightedAverageRates = (payload: any) => {
	return new Promise((resolve, reject) => {
		let uri = "/backend-rates/hedge-weighted-average";
		const formattedPayload = {
			type: payload.trade_type,
			pair: payload.currency_pair,
		};

		axiosObject
			.post(uri, formattedPayload)
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				console.log("Errors", errors);
				if (
					errors.response.data.statusCode === 404 &&
					errors.response.data.errorCode === "NO_ACTIVE_HEDGES_FOUND"
				) {
					resolve("NO_ACTIVE_HEDGES_FOUND");
				}
				reject(errors);
			});
	});
};

export { getHedgesWeightedAverageRates };
