import axiosObject from "../config";

function getAlerts(user_uuid: any) {
	return new Promise((resolve, reject) => {
		let uri = `/backend-fx/api/alerts?user_uuid=${user_uuid}`;

		axiosObject
			.get(uri)
			.then((response) => {
				resolve(response.data.alerts);
			})
			.catch((errors) => {
				reject(errors);
			});
	});
}

export { getAlerts };
