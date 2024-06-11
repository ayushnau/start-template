import React from "react";
import TickIcon from "icons/TickIcon";
import { PropIcon1, PropIcon2, PropIcon3, PropIcon4, PropIcon5 } from "icons";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";

interface RateCalculatorResultProps {
	pair: string;
	calculatedValue: number;
	currentRate: number;
	currentSpot: string;
	forwardPoints: string;
}

const RateCalculatorResult: React.FC<RateCalculatorResultProps> = ({
	pair,
	calculatedValue,
	currentRate,
	currentSpot,
	forwardPoints,
}) => {
	return (
		<div className="p-4 mt-4 pb-6 bg-[#F0F3F8] rounded-xl mb-4 relative">
			<PropIcon1 style="absolute bottom-0 right-[127px]" />
			<PropIcon2 style="absolute bottom-0 right-[100px]" />
			<PropIcon3 style="absolute bottom-1 right-[84px]" />
			<PropIcon4 style="absolute bottom-0 right-[43px]" />
			<PropIcon5 style={"absolute bottom-1 right-[0px]"} />

			<div className="flex items-center">
				<div className="font-bold text-2xl">
					{getCurrencySymbol(pair.split("/")[1])}
					{calculatedValue}
				</div>
				<div className="w-5 h-5 p-1 bg-mountain-meadow-2 rounded-full flex items-center justify-center ml-[6px]">
					<TickIcon />
				</div>
			</div>
			<div className="mt-4 w-full h-[1px] bg-mine-shaft-2 mb-3"></div>
			<div className="mb-3 text-base font-bold">
				{`1${getCurrencySymbol(pair.split("/")[0])} = ${getCurrencySymbol(
					pair.split("/")[1],
				)}${currentRate}`}
			</div>
			<div className="flex items-center gap-x-10">
				<div>
					<div className="text-mine-shaft-3 text-xs font-normal">
						Current Spot
					</div>
					<div className="text-sm font-semibold ">{currentSpot}</div>
				</div>
				<div className="">
					<div className="text-mine-shaft-3 text-xs font-normal">
						Forward Points
					</div>
					<div className="text-sm font-semibold ">{forwardPoints}</div>
				</div>
			</div>
		</div>
	);
};

export default RateCalculatorResult;
