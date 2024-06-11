function copyToClipBoard(copyText: string) {
	// Get the text field
	// var copyText = document.getElementById("myInput");

	// Select the text field
	// copyText.select();
	// copyText.setSelectionRange(0, 99999); // For mobile devices

	// Copy the text inside the text field
	navigator.clipboard.writeText(copyText);

	// Alert the copied text
	alert(copyText + " Copied to Clipboard!");
}

export { copyToClipBoard };
