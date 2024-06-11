const renderTitleString = (name: string) => {
	return name
		.split("-")
		.map((ele: string) => {
			return ele.charAt(0).toUpperCase() + ele.slice(1);
		})
		.join(" ");
};

export { renderTitleString };
