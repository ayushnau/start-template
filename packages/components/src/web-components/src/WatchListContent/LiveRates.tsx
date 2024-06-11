import React from "react";
import { useLocation } from "react-router-dom";
// import ForwardRates from "../../../../../../apps/wiredup/src/pages/fx/ForwardRates";
import ForwardRates from "./ForwardRates";
import { useSelector } from "react-redux";
import EmptyLiveRates from "./EmptyLiveRates";
import { StoreState } from "store";

export interface LiveRatesInterface {}

const LiveRates: React.FC<LiveRatesInterface> = ({}) => {
	const { pathname } = useLocation();
	const [currencyPair, setCurrencyPair] = React.useState("");
	const rates = useSelector((state: StoreState) => state.ratesSlice.rates);

	React.useEffect(() => {
		const loc = pathname.split("/");
		const currencyPair = loc[loc.length - 1];
		setCurrencyPair(currencyPair);
	}, [rates, pathname, currencyPair]);

	if (currencyPair === "watch-list") {
		return <EmptyLiveRates />;
	}

	return (
		<div className="px-8 pt-5 h-full">
			<ForwardRates
				pair={currencyPair}
				pairSptRates={rates}
				openAlerts={() => {
					//Add navifation to rates alert screen
					console.log(">>>>>OPEN ALERTS");
				}}
				openRateCalc={() => {
					//TODO: Add navigation to rate calculator
					console.log(">>>>OPEN RATES CALC");
				}}
			/>
		</div>
	);
};

export default LiveRates;
