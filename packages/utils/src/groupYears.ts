const groupYears = (monthList: any) => {
	const monthsObject: any = {};
	monthList.forEach((ele: any, index: number) => {
		if (Object.keys(monthsObject).includes(ele.year.toString())) {
			monthsObject[ele.year]?.push(ele);
		} else {
			monthsObject[ele.year] = [ele];
		}
	});
	return monthsObject;
};
export { groupYears };
