import axiosObject from "../../config";

interface HedgeRecalculationServiceInterface {
	hedge_id?: string;
}

function recalculateHedge({ hedge_id }: HedgeRecalculationServiceInterface) {
	return new Promise((resolve, reject) => {
		let uri = "";
		if (hedge_id) {
			uri = `/backend-fx/api/hedges/${hedge_id}/recalc`;
		} else {
			uri = `/backend-fx/api/hedges/1/recalculateAll`;
		}
		axiosObject
			.get(uri)
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				reject(errors);
			});
	});
}

export { recalculateHedge };
