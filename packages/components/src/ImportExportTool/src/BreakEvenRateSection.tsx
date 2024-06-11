import React from "react";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { twMerge } from "tailwind-merge";
import { GreenRoundedCheckIcon } from "icons";

export interface BreakEvenRateSectionInterface {
	rate?: string;
	quote_currency: string;
	label1: string;
	showCheck: boolean;
}

const BreakEvenRateSection: React.FC<BreakEvenRateSectionInterface> = ({
	rate,
	quote_currency,
	label1,
	showCheck = false,
}) => {
	return (
		<>
			<label className="font-inter text-sm leading-[22px] text-mine-shaft-4">
				WiredUp calculated break-even rate
			</label>
			<div className="flex items-center gap-x-2">
				{rate && (
					<label
						className={
							"text-xl font-bold leading-[26px] -tracking[0.35px] text-mine-shaft-3 line-through"
						}
					>
						{`${getCurrencySymbol(quote_currency)}${(+rate).toFixed(2)}`}
					</label>
				)}
				<label
					className={twMerge(
						"text-xl font-bold leading-[26px] -tracking[0.35px]",
						showCheck ? "text-mountain-meadow-2" : "text-sunset-orange-2",
					)}
				>
					{`${getCurrencySymbol(quote_currency)}${label1}`}
				</label>
				{showCheck && <GreenRoundedCheckIcon className="h-5 w-5" />}
			</div>
		</>
	);
};

export default BreakEvenRateSection;
