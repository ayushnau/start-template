import { EmptyLedgersIcon } from "icons";
import React from "react";

export interface EmptyLedgersSectionInterface {
	altIcon?: React.ReactNode;
	altText?: string;
}

const EmptyLedgersSection: React.FC<EmptyLedgersSectionInterface> = ({
	altIcon,
	altText,
}) => {
	const EMPTYRATESSTRING =
		altText ||
		"A ledger is a book or collection of accounts in which business transactions or trades are recorded.";
	return (
		<div className="w-full h-full flex flex-col  justify-center items-center gap-y-6 px-6">
			{altIcon ? altIcon : <EmptyLedgersIcon />}
			<label className="text-mine-shaft-3 font-inter text-sm leading-[22px] text-center">
				{EMPTYRATESSTRING}
			</label>
		</div>
	);
};

export default EmptyLedgersSection;
