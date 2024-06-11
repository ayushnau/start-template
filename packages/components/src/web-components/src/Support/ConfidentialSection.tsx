import React from "react";
import { ShieldIcon } from "icons";

export interface ConfidentialSectionInterface {}

const ConfidentialSection: React.FC<ConfidentialSectionInterface> = ({}) => {
	return (
		<div className="flex-row items-center py-2 gap-1 inline-flex px-[10px] mt-2">
			<div className="shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-mountain-meadow-1 p-1 gap-x-1">
				<ShieldIcon className="" />
			</div>
			<div className="font-inter text-sm leading-[18px] text-mountain-meadow-dark">
				Your Data is Our Priority: Strictly Confidential & Secure
			</div>
		</div>
	);
};

export default ConfidentialSection;
