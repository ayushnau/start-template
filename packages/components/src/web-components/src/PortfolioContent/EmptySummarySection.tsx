import { EmptySummaryIcon } from "icons";
import React from "react";

export interface EmptyLedgersSectionInterface {
	altIcon?: React.ReactNode;
	altText?: string;
}

const EmptySummarySection: React.FC<EmptyLedgersSectionInterface> = ({
	altIcon,
	altText,
}) => {
	const EMPTYRATESSTRING =
		altText ||
		"Find the summary of all your trades and hedges categorized by MTM currency and volume.";
	return (
		<div className="w-full h-full flex flex-col  justify-center items-center gap-y-6 px-6">
			{altIcon ? altIcon : <EmptySummaryIcon />}
			<label className="text-mine-shaft-3 font-inter text-sm leading-[22px] text-center">
				{EMPTYRATESSTRING}
			</label>
		</div>
	);
};

export default EmptySummarySection;
