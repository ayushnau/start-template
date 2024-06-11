import React from "react";
import { GrayLabel } from "../..";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { formatNumberWithCommas } from "utils";
import { IIcon } from "icons";
import { AverageDetailsInterface } from "interfaces";

export interface AverageDetailsPropsInterface extends AverageDetailsInterface {
	infoIconCallback?: () => void;
}

const AverageDetails: React.FC<AverageDetailsPropsInterface> = ({
	infoIconCallback,
	weightedHedgedAverageRates,
	weightedUnHedgedAverageRates,
	currency,
}) => {
	return (
		<div className="flex flex-col gap-y-2">
			<div className="flex items-center justify-start">
				<label className="text-mine-shaft-4 font-inter font-bold leading-6 -tracking-[0.3px]">
					Weighted average rate
				</label>
				<div
					className="scale-[80%] ml-1"
					onClick={() => {
						infoIconCallback && infoIconCallback();
					}}
				>
					<IIcon color="" />
				</div>
			</div>
			<div className="py-1 flex gap-x-4">
				<div className="w-full flex flex-col gap-y-1">
					<GrayLabel labelText="Hedged average rate" />
					<label className="font-inter text-sm leading-[22px]">{`${getCurrencySymbol(
						currency,
					)} ${formatNumberWithCommas(weightedHedgedAverageRates)}`}</label>
				</div>
				<div className="w-full flex flex-col gap-y-1">
					<GrayLabel labelText="UnHedged average rate" />
					<label className="font-inter text-sm leading-[22px]">{`${getCurrencySymbol(
						currency,
					)} ${formatNumberWithCommas(weightedUnHedgedAverageRates)}`}</label>
				</div>
			</div>
		</div>
	);
};

export default AverageDetails;
