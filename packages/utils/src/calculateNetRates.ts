const calculateNetRates = (data: any, sptRate: any, tomRate: any) => {
	let payload = data ? data : {};
	if (sptRate) {
		// change contract type in backend and then change here
		if (data.contractType === "FWD" || data.contractType === "NDF") {
			payload["bid"] = parseFloat(data.bid ? data.bid : 0).toFixed(4);
			payload["ask"] = parseFloat(data.ask ? data.ask : 0).toFixed(4);
			if (data.pair === "JPY/INR") {
				const bidLiveRate = sptRate.bid ? parseFloat(sptRate.bid) / 100 : 0;
				const askLiveRate = sptRate.bid ? parseFloat(sptRate.ask) / 100 : 0;
				const bidNetRate: any = (parseFloat(data.bid_calc) + bidLiveRate) * 100;
				const askNetRate: any = (parseFloat(data.bid_calc) + askLiveRate) * 100;

				payload["ask_net_rate"] = parseFloat(askNetRate).toFixed(4);
				payload["bid_net_rate"] = parseFloat(bidNetRate).toFixed(4);
			} else {
				if (data.tenor === "CASH") {
					payload["ask_net_rate"] = parseFloat(
						(
							parseFloat(sptRate.ask ? sptRate.ask : 0) -
							parseFloat(data.bid_calc ? data.bid_calc : 0)
						).toString(),
					).toFixed(4);
					payload["bid_net_rate"] = parseFloat(
						(
							parseFloat(sptRate.bid ? sptRate.bid : 0) -
							parseFloat(data.ask_calc ? data.ask_calc : 0)
						).toString(),
					).toFixed(4);
				} else if (data.tenor === "TOM") {
					const prevBidCalc: any = tomRate
						? tomRate.bid_calc
							? tomRate.bid_calc
							: 0
						: 0;
					const prevAskCalc: any = tomRate
						? tomRate.ask_calc
							? tomRate.ask_calc
							: 0
						: 0;

					payload["ask_net_rate"] = parseFloat(
						(
							parseFloat(sptRate.ask ? sptRate.ask : 0) -
							parseFloat(prevBidCalc)
						).toString(),
					).toFixed(4);
					payload["bid_net_rate"] = parseFloat(
						(
							parseFloat(sptRate.bid ? sptRate.bid : 0) -
							parseFloat(prevAskCalc)
						).toString(),
					).toFixed(4);
				} else {
					payload["ask_net_rate"] = parseFloat(
						(
							parseFloat(data.ask_calc ? data.ask_calc : 0) +
							parseFloat(sptRate.ask ? sptRate.ask : 0)
						).toString(),
					).toFixed(4);
					payload["bid_net_rate"] = parseFloat(
						(
							parseFloat(data.bid_calc ? data.bid_calc : 0) +
							parseFloat(sptRate.bid ? sptRate.bid : 0)
						).toString(),
					).toFixed(4);
				}
			}
		} else {
			payload["bid"] = "-";
			payload["ask"] = "-";
			payload["bid_net_rate"] = parseFloat(
				data.bid_calc ? data.bid_calc : 0,
			).toFixed(4);
			payload["ask_net_rate"] = parseFloat(
				data.ask_calc ? data.ask_calc : 0,
			).toFixed(4);
		}
	} else {
		payload["ask"] = "-";
		payload["bid"] = "-";
		payload["ask_net_rate"] = "-";
		payload["bid_net_rate"] = "-";
	}
	return payload;
};

export { calculateNetRates };
