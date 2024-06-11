import React from "react";
import { GrayLabel } from "../..";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { formatNumberWithCommas } from "utils";

export interface VolumeDetailsInterface {
	hedgedAmount: string;
	unhedgedAmount: string;
	currency: string;
}

const VolumeDetails: React.FC<VolumeDetailsInterface> = ({
	hedgedAmount,
	unhedgedAmount,
	currency,
}) => {
	return (
		<div className="flex flex-col gap-y-2">
			<label className="text-mine-shaft-4 font-inter font-bold leading-6 -tracking-[0.3px]">
				Volume
			</label>
			<div className="py-1 flex gap-x-4">
				<div className="w-full flex flex-col gap-y-1">
					<GrayLabel labelText="Hedged amount" />
					<label className="font-inter text-sm leading-[22px]">{`${getCurrencySymbol(
						currency,
					)} ${formatNumberWithCommas(hedgedAmount)}`}</label>
				</div>
				<div className="w-full flex flex-col gap-y-1">
					<GrayLabel labelText="UnHedged amount" />
					<label className="font-inter text-sm leading-[22px]">{`${getCurrencySymbol(
						currency,
					)} ${unhedgedAmount.includes("-") ? "-" : ""}${formatNumberWithCommas(
						unhedgedAmount,
					)}`}</label>
				</div>
			</div>
		</div>
	);
};

export default VolumeDetails;
