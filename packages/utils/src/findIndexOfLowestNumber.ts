function findIndexOfLowestNumber(numbers: string[]): number {
	if (numbers.length === 0) {
		return -1; // Return -1 if the array is empty
	}

	let lowestIndex = 0; // Assume the first element is the lowest
	let lowestNumber = numbers[0]; // Store the lowest number

	for (let i = 1; i < numbers.length; i++) {
		if (+numbers[i] < +lowestNumber) {
			// If a lower number is found, update the index and value
			lowestIndex = i;
			lowestNumber = numbers[i];
		}
	}

	return lowestIndex;
}

export default findIndexOfLowestNumber;
