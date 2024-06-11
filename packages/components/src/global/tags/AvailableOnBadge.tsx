import React from "react";

export interface AvailableOnBadgeInterface {}

const AvailableOnBadge: React.FC<AvailableOnBadgeInterface> = ({}) => {
	return (
		<div className="bg-white w-fit rounded-md px-[6px] py-[2px] font-inter text-[10px] font-bold leading-4">
			⚡ Available on WiredUp Mobile App
		</div>
	);
};

export default AvailableOnBadge;
