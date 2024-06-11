import axiosObject from "../config";

const getUserSubscriptionData = (user_uuid: string) => {
	return new Promise((resolve, reject) => {
		let uri = `/backend-payments/subscription/${user_uuid}`;

		axiosObject
			.get(uri)
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				console.log(
					"Errors while getting user subscription details are:",
					JSON.stringify(errors),
				);
				reject(errors);
			});
	});
};

const createUserSubscription = (payload: any) => {
	return new Promise((resolve, reject) => {
		let uri = `/backend-payments/subscription`;

		axiosObject
			.post(uri, payload)
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				console.log(
					"Errors while creating user subscription are:",
					JSON.stringify(errors),
				);
				reject(errors);
			});
	});
};

const updateUserSubscription = (uuid: string, payload: any) => {
	return new Promise((resolve, reject) => {
		let uri = `/backend-payments/subscription/${uuid}`;

		axiosObject
			.put(uri, payload)
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				console.log(
					"Errors while updating user subscription are:",
					JSON.stringify(errors),
				);
				reject(errors);
			});
	});
};

export {
	getUserSubscriptionData,
	createUserSubscription,
	updateUserSubscription,
};
