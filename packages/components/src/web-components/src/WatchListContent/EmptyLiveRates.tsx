import { EmptyLiveRatesIcon } from "icons";
import React from "react";

export interface EmptyLiveRatesInterface {}

const EmptyLiveRates: React.FC<EmptyLiveRatesInterface> = ({}) => {
	const EMPTYRATESSTRING =
		"Select currency pair to view forward rates, set alerts, and calculate rates for any future date.";
	return (
		<div className="w-full h-full flex flex-col  justify-center items-center gap-y-6 px-6">
			<EmptyLiveRatesIcon />
			<label className="text-mine-shaft-3 font-inter text-sm leading-[22px] text-center">
				{EMPTYRATESSTRING}
			</label>
		</div>
	);
};

export default EmptyLiveRates;
