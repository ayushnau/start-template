import { IIcon } from "icons";
import React from "react";

export interface QuoteInfoInterface {}

const DATAARRAY = [
	"This gain is based on the current forward rates prevailing in the market.",
	"This gain represents a potential profit at the quotation rate provided",
];

const QuoteInfo: React.FC<QuoteInfoInterface> = ({}) => {
	return (
		<>
			{DATAARRAY.map((label: string, index: number) => {
				return (
					<div key={index} className="flex gap-x-2 ">
						<IIcon color="" />
						<label className="text-inter text-xs leading-[18px] text-color-black-6">
							{label}
						</label>
					</div>
				);
			})}
		</>
	);
};

export default QuoteInfo;
