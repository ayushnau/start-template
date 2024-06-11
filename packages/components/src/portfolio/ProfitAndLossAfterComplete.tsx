import React from "react";
import { formatNumberWithCommas } from "utils";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";

interface ProfitAndLossAfterCompleteProps {
	quoteCurrency: string;
	profit: boolean;
	description: React.ReactNode;
	value: string;
	className?: string;
}
const ProfitAndLossAfterComplete: React.FC<ProfitAndLossAfterCompleteProps> = ({
	profit,
	description,
	value,
	className,
	quoteCurrency,
}) => {
	return (
		<div
			className={`border relative rounded-xl bg-white border-semiLightGray pt-8 px-4 pb-4 leading-[26px] -tracking-[0.35px] flex justify-center items-center flex-col ${className}`}
		>
			<div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 text-[40px] font-bold -tracking-[1.5px]">
				{profit ? "🥳" : "😥"}
			</div>
			<div className="font-bold text-blackDark text-xl font-inter align-middle text-center">
				{description}
			</div>
			<p
				className={`text-[25px] font-inter font-bold leading-[34px] mt-2 -tracking-[0.5px] ${
					profit ? "text-mountain-meadow-2" : "text-red-core"
				}`}
			>
				{`${profit ? "" : "-"}${getCurrencySymbol(
					quoteCurrency,
				)}${formatNumberWithCommas(Math.abs(parseInt(value)).toString())}`}
			</p>
		</div>
	);
};

export default ProfitAndLossAfterComplete;
