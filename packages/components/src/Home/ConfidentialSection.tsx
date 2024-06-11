import React from "react";
import HomeSectionWrapper from "./src/HomeSectionWrapper";
import { ConfidentialIcon } from "icons";

export interface ConfidentialSectionInterface {}

const ConfidentialSection: React.FC<ConfidentialSectionInterface> = ({}) => {
	return (
		<HomeSectionWrapper>
			<div className="flex flex-col items-center justify-center px-2 pb-4">
				<ConfidentialIcon />
				<label className="font-inter text-mine-shaft-2 text-xl font-bold leading-[26px] -tracking-[0.35px]">
					Confidential & Secure
				</label>
				<label className="font-inter text-mine-shaft-2 text-[10px] font-bold leading-4">
					Powered by Unoroof Fintech Solutions Private Limited
				</label>
			</div>
		</HomeSectionWrapper>
	);
};

export default ConfidentialSection;
