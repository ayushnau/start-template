const isThisPastMaturity = (date: Date) => {
	const md = new Date(date);
	const cd = new Date().setHours(0, 0, 0, 0);
	if ((md as unknown as number) < cd) {
		return true;
	}
	return false;
};

export { isThisPastMaturity };
