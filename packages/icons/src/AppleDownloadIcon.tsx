import React from "react";
import { twMerge } from "tailwind-merge";

const AppleDownloadIcon = ({ className = "" }) => {
	return (
		<div className="sm:h-[49px] w-[167px] sm:w-auto">
			<img
				className="object-contain h-full w-full"
				src="/icons/appledownloadicon.png"
				alt=""
			/>
		</div>
	);
};

export default AppleDownloadIcon;
