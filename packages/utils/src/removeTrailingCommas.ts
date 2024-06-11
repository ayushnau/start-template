function removeTrailingCommas(inputString: string) {
	const withoutTrailingCommas = inputString.replace(/,+$/, "");
	const finalResult = withoutTrailingCommas.replace(/^,+/g, "");

	return finalResult;
}

export default removeTrailingCommas;
