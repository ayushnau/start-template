import axiosObject from "../../config";

interface EEFCRecalculationServiceInterface {
	eefc_id?: string;
}

function recalculateEEFC({ eefc_id }: EEFCRecalculationServiceInterface) {
	return new Promise((resolve, reject) => {
		let uri = "";
		if (eefc_id) {
			uri = `/backend-fx/api/eefcs/${eefc_id}/recalc`;
		} else {
			uri = `/backend-fx/api/eefcs/1/recalculateAll`;
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

export { recalculateEEFC };
