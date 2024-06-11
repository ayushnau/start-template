import React from "react";
import TickIcon from "icons/TickIcon";
import { PropIcon1, PropIcon2, PropIcon3, PropIcon4, PropIcon5 } from "icons";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";

interface RateCalculatorResultProps {
	pair: string;
	calculatedValue: number;
	currentRate: Number;
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
				<div className="w-5 h-5 bg-mountain-meadow-2 rounded-full flex items-center justify-center ml-[6px]">
					<TickIcon />
				</div>
			</div>
			<div className="mt-4 w-full h-[1px] bg-mine-shaft-2 mb-3"></div>
			<div className="mb-3 text-base font-bold">
				1{getCurrencySymbol(pair.split("/")[0])} ={" "}
				{getCurrencySymbol(pair.split("/")[1])}
				{currentRate}
			</div>
			<div className="flex items-center">
				<div>
					<div className="text-mine-shaft-3 text-xs font-normal">
						Current Spot
					</div>
					<div className="text-sm font-semibold ">{currentSpot}</div>
				</div>
				<div className="ml-[44px]">
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

// <img
//         className="absolute bottom-0 right-[127px]"
//         src="https://wiredup-staging-file.s3.ap-south-1.amazonaws.com/09298813-ae31-4560-abe9-f6543cb82850"
//         alt=""
//       />
//       <img
//         className="absolute bottom-0 right-[100px]"
//         src="https://wiredup-staging-file.s3.ap-south-1.amazonaws.com/fc3760dc-f4aa-403c-bc0e-62e581538306"
//         alt=""
//       />
//       <img
//         className="absolute bottom-1 right-[84px]"
//         src="https://wiredup-staging-file.s3.ap-south-1.amazonaws.com/88f47186-745e-47b2-b7fd-e48edf1cf7d7"
//         alt=""
//       />
//       <img
//         className="absolute bottom-0 right-[43px]"
//         src="https://wiredup-staging-file.s3.ap-south-1.amazonaws.com/b70c3653-afd6-4001-b43a-d670d2f690bb"
//         alt=""
//       />
//       <img
//         className="absolute bottom-1 right-[0px]"
//         src="https://wiredup-staging-file.s3.ap-south-1.amazonaws.com/5f44ab85-9ae8-4e16-9741-85fb15721a95"
//         alt=""
//       />
