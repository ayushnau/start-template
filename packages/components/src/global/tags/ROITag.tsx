import React from "react";

export interface ROITagInterface {
	fit?: boolean;
	roi?: number;
	showInfo?: boolean;
}

const ROITag: React.FC<ROITagInterface> = ({ fit = false, roi = 0 }) => {
	const roi_styles = "bg-mine-shaft-3 text-white";

	return (
		<div
			className={`flex items-center rounded-md px-2 py-1 font-bold text-xs mb-auto mt-1 ${roi_styles}  ${
				fit ? "w-fit my-1 " : ""
			} `}
		>
			{roi ? roi + "%" : 0 + "%"}
		</div>
	);
};

export default ROITag;
