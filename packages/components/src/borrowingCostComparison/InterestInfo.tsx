import { IIcon } from "icons";
import React from "react";

export interface InterestInfoInterface {
	labels: string[];
}

const InterestInfo: React.FC<InterestInfoInterface> = ({ labels }) => {
	return (
		<div className="flex flex-col gap-y-2">
			{labels.map((label: string, index: number) => {
				return (
					<div key={index} className="flex items-start gap-x-2 ">
						<IIcon color="#646464" />
						<label className="font-inter text-xs leading-[18px]">{label}</label>
					</div>
				);
			})}
		</div>
	);
};

export default InterestInfo;
