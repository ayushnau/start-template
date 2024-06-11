import axiosObject from "../config";

export interface sptRates {
	pair: String;
	data: Object;
}

function getSptRates(pairs: sptRates) {
	return new Promise((resolve, reject) => {
		let uri = `/backend-rates/rates`;
		axiosObject
			.post(uri, { type: "SPT", pairs })
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				reject(errors);
			});
	});
}
function getSptRatesforPublicUsers() {
	return new Promise((resolve, reject) => {
		let uri = `/backend-rates/rates`;
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

function getFavouriteCurrencyPairs() {
	return new Promise((resolve, reject) => {
		let uri = `/backend-fx/api/user_settings/favourites`;

		axiosObject
			.get(uri)
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				console.log("errr", errors);
				reject(errors);
			});
	});
}

function getAllRatesForPair(pair: string) {
	return new Promise((resolve, reject) => {
		let uri = `/backend-rates/all-rates?pair=${pair}`;

		axiosObject
			.get(uri)
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				console.log("errr", errors);
				reject(errors);
			});
	});
}

function addFavourites(payload: any) {
	return new Promise((resolve, reject) => {
		let uri = `/backend-fx/api/user_settings/favourites`;
		axiosObject
			.post(uri, payload)
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				// console.log('backend errors:', errors);
				if (errors.response.status === 422) {
					reject(errors.response.data.errors);
				}
				reject(errors);
			});
	});
}

function getPairs() {
	return new Promise((resolve, reject) => {
		let uri = `/backend-rates/currency-pairs`;

		axiosObject
			.get(uri)
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				console.log("errr", errors);
				reject(errors);
			});
	});
}

export {
	getSptRates,
	getSptRatesforPublicUsers,
	getFavouriteCurrencyPairs,
	getAllRatesForPair,
	addFavourites,
	getPairs,
};
