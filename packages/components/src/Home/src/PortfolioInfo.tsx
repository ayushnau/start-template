import { BulbIcon } from "icons";
import React from "react";

export interface PortfolioInfoInterface {}

const PortfolioInfo: React.FC<PortfolioInfoInterface> = ({}) => {
	return (
		<div className="flex gap-x-2 items-center justify-center px-[5px] py-1 bg-[#FFF8EC] rounded-lg my-2">
			<div className="w-5 h-5 shrink-0 flex items-center justify-center">
				<BulbIcon />
			</div>
			<label className="font-inter text-color-black-6 text-xs leading-[18px]">
				This is how you can see the summary of your portfolio after adding
				trades and hedges
			</label>
		</div>
	);
};

export default PortfolioInfo;
