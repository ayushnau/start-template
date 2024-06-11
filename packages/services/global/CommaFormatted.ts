export function commaFormatted(value: string): string {
	// First, remove any existing commas or other non-numeric characters
	const numericValue = value.replace(/[^0-9]/g, "");

	// Split the value into integer and decimal parts
	const [integerPart, decimalPart] = numericValue.split(".");

	// Reverse the integer part and insert commas every three digits
	const formattedInteger = integerPart
		.split("")
		.reverse()
		.join("")
		.replace(/(\d{3})/g, "$1,")
		.split("")
		.reverse()
		.join("")
		.replace(/^,/, "");

	// If there's a decimal part, add it back to the formatted integer
	const formattedValue = decimalPart
		? `${formattedInteger}.${decimalPart}`
		: formattedInteger;

	return formattedValue;
}
