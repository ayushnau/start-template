const getCurrencySymbol = (currencyCode: string) => {
	let currencyList: any = {
		AUD: "$",
		BRL: "R$",
		CAD: "$",
		CLP: "$",
		CNY: "¥",
		CZK: "Kč",
		DKK: "kr",
		HKD: "$",
		HUF: "Ft",
		INR: "₹",
		IDR: "Rp",
		JPY: "¥",
		MYR: "RM",
		MXN: "$",
		NZD: "$",
		NOK: "kr",
		PHP: "₱",
		PLN: "zł",
		QAR: "﷼",
		RON: "lei",
		RUB: "₽",
		SAR: "﷼",
		SGD: "$",
		ZAR: "R",
		KRW: "₩",
		CHF: "CHF",
		TWD: "NT$",
		THB: "฿",
		TRY: "₺",
		USD: "$",
		EUR: "€",
		GBP: "£",
	};

	if (currencyList[currencyCode]) {
		return currencyList[currencyCode];
	}
	return currencyCode + " ";
};

export { getCurrencySymbol };
