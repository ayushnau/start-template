export const convertCsvFileToCsv = (uploadedFile: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = (e: any) => {
			try {
				const data = e.target.result;
				resolve(data);
			} catch (error) {
				reject(error);
			}
		};

		reader.onerror = (e) => {
			reject(new Error("Error reading the file"));
		};

		reader.readAsText(uploadedFile);
	});
};
