import React from "react";

const InfoContentForwardRates = () => {
	return (
		<div className="">
			<div>
				<div className="font-bold text-base mb-2">Forward Points</div>
				<p className="font-normal text-sm text-mine-shaft-3 ">
					The swap points that are derived from the differential in the interest
					rate of two currencies in a currency pair. They are expressed in Paise
					terms( 0.01) for all INR pairs and USD/JPY wile for the rest, forward
					points are expressed in Pips ( 0.0001)
				</p>
			</div>
			<div className="mt-2 pb-2">
				<div className="font-bold text-base mb-2">Net Rate</div>
				<p className="font-normal text-sm text-mine-shaft-3 ">
					The Final rate that is arrived from Spot and Forward points for any
					respective maturity. For e.g. the Net rate of Jan is Spot+Forward
					points for Jan using Bid points for selling foreign currency while Ask
					for buying foreign currency.
				</p>
			</div>
		</div>
	);
};

export default InfoContentForwardRates;
