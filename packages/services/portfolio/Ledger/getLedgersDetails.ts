import axiosObject from "../../config";

function getLedgersDetails(workbook_id: any) {
	return new Promise((resolve, reject) => {
		let uri = `/backend-fx/api/work-books/${workbook_id}`;

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

export { getLedgersDetails };
